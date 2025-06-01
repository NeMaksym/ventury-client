import cc from 'currency-codes'

import { SourceTransaction, SystemTransaction } from '../../../types'
import { LoadExchangeRatesDTO } from './loadExchangeRates'

const USD_CODE = 840

export interface ToSystemTransactionsDTO extends LoadExchangeRatesDTO {
    systemTransactions: SystemTransaction[]
}

type ToSystemTransactions = (
    input: LoadExchangeRatesDTO
) => ToSystemTransactionsDTO

export const toSystemTransactions: ToSystemTransactions = (input) => {
    const { sourceTransactions, bank, exchangeRatesMap, addMessage } = input

    addMessage('Adding reference amount to transactions...')

    const systemTransactions = sourceTransactions.map((transaction) => ({
        ...transaction,
        bank,
        referenceAmount: getReferenceAmount(transaction, exchangeRatesMap),
        referenceCurrencyCode: USD_CODE,
        category: null,
    }))

    return {
        ...input,
        systemTransactions,
    }
}

function getReferenceAmount(
    transaction: SourceTransaction,
    exchangeRatesMap: LoadExchangeRatesDTO['exchangeRatesMap']
): bigint {
    if (transaction.operationCurrencyCode === USD_CODE) {
        return transaction.operationAmount
    }

    const date = new Date(Number(transaction.time)).toISOString().split('T')[0]

    const code = cc.number(transaction.operationCurrencyCode.toString())

    if (!code) {
        throw new Error(
            `Unknown currency code: ${transaction.operationCurrencyCode}`
        )
    }

    const rate: number | undefined =
        exchangeRatesMap[date][code.code.toLowerCase()]

    if (!rate) {
        throw new Error(
            `Exchange rate not found for ${date} and ${code.code.toLowerCase()}`
        )
    }

    return BigInt(Math.round(Number(transaction.operationAmount) * rate))
}
