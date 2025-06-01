import cc from 'currency-codes'

import { Bank, SourceTransaction } from '../../../types'
import { AddMessage } from '../../../hooks/useMessages'

const USD_CODE = 840

interface PipelineInput {
    sourceTransactions: SourceTransaction[]
    addMessage: AddMessage
    bank: Bank
}

type DateToCurrencyMap = {
    [date: string]: string[]
}

export interface DateToCurrencyMapDTO extends PipelineInput {
    dateToCurrencyMap: DateToCurrencyMap
}

type GetDateToCurrencyMap = (input: PipelineInput) => DateToCurrencyMapDTO

export const getDateToCurrencyMap: GetDateToCurrencyMap = (input) => {
    const { sourceTransactions, addMessage } = input

    addMessage('Preparing to fetch exchange rates...')

    const dateToCurrencyMap = sourceTransactions.reduce<DateToCurrencyMap>(
        (acc, transaction) => {
            if (transaction.operationCurrencyCode === USD_CODE) {
                return acc
            }

            const date = new Date(Number(transaction.time))
                .toISOString()
                .split('T')[0]

            const currency = cc.number(
                transaction.operationCurrencyCode.toString()
            )

            if (!currency) {
                throw new Error(
                    `Unknown currency code: ${transaction.operationCurrencyCode}`
                )
            }

            acc[date] = [
                ...(acc[date] ?? []),
                currency.code.toLocaleLowerCase(),
            ]
            return acc
        },
        {}
    )

    return {
        ...input,
        dateToCurrencyMap,
    }
}
