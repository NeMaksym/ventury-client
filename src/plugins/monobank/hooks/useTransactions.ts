import { useState, useCallback } from 'react'
import dayjs from 'dayjs'

import { MonoAPIClientInfo, MonoAPITransaction } from '../types'

interface UseTransactionsState {
    data: MonoAPITransaction[] | null
    isLoading: boolean
    error: string | null
}

interface FetchParams {
    apiToken: string
    account: MonoAPIClientInfo['accounts'][number]
    startDate: dayjs.Dayjs
    endDate: dayjs.Dayjs
}

interface UseTransactionsReturn extends UseTransactionsState {
    fetch: (
        params: FetchParams,
        onSuccess: (
            data: MonoAPITransaction[],
            account: MonoAPIClientInfo['accounts'][number]
        ) => void
    ) => Promise<void>
    reset: () => void
}

function fetchTransactions({
    apiToken,
    account,
    startDate,
    endDate,
}: FetchParams): Promise<Response> {
    const from = startDate.startOf('day').unix()
    const to = endDate.endOf('day').unix()
    const url = `https://api.monobank.ua/personal/statement/${account.id}/${from}/${to}`

    return fetch(url, {
        headers: {
            'X-Token': apiToken,
        },
    })
}

const DEFAULT_STATE: UseTransactionsState = {
    data: null,
    isLoading: false,
    error: null,
}

export function useTransactions(): UseTransactionsReturn {
    const [state, setState] = useState<UseTransactionsState>(DEFAULT_STATE)

    const fetch = useCallback(
        async (
            { apiToken, account, startDate, endDate }: FetchParams,
            onSuccess: (
                data: MonoAPITransaction[],
                account: MonoAPIClientInfo['accounts'][number]
            ) => void
        ): Promise<void> => {
            setState(DEFAULT_STATE)

            try {
                const result = await fetchTransactions({
                    apiToken,
                    account,
                    startDate,
                    endDate,
                })

                if (!result.ok) {
                    const error = await result.json()
                    throw new Error(error.errorDescription)
                }

                const data = await result.json()

                onSuccess(data, account)

                setState({
                    data,
                    isLoading: false,
                    error: null,
                })
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'An unexpected error occurred'

                setState({
                    data: null,
                    isLoading: false,
                    error: errorMessage,
                })
            }
        },
        [fetchTransactions]
    )

    const reset = useCallback((): void => {
        setState(DEFAULT_STATE)
    }, [])

    return {
        ...state,
        fetch,
        reset,
    }
}
