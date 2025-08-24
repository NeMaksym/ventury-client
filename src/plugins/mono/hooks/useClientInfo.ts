import { useState, useCallback } from 'react'
import { MonoAPIClientInfo } from '../types'

interface UseDataFetchState {
    data: MonoAPIClientInfo | null
    isLoading: boolean
    error: string | null
}

interface UseDataFetchReturn extends UseDataFetchState {
    fetch: (apiToken: string) => Promise<void>
    reset: () => void
}

function fetchClientInfo(apiToken: string): Promise<Response> {
    return fetch('https://api.monobank.ua/personal/client-info', {
        headers: {
            'X-Token': apiToken,
        },
    })
}

const DEFAULT_STATE: UseDataFetchState = {
    data: null,
    isLoading: false,
    error: null,
}

export function useClientInfo(): UseDataFetchReturn {
    const [state, setState] = useState<UseDataFetchState>(DEFAULT_STATE)

    const fetch = useCallback(
        async (apiToken: string): Promise<void> => {
            setState(DEFAULT_STATE)

            try {
                const result = await fetchClientInfo(apiToken)

                if (!result.ok) {
                    const error = await result.json()
                    throw new Error(error.errorDescription)
                }

                const data = await result.json()

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
        [fetchClientInfo]
    )

    const reset = useCallback((): void => setState(DEFAULT_STATE), [])

    return {
        ...state,
        fetch,
        reset,
    }
}
