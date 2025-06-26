import { SourceTransaction, SystemTransaction } from '../../../types'
import { encodeKey, LoadExchangeRatesDTO } from './loadExchangeRates'
import { currency } from '../../../utils/currency'

export interface ToSystemTransactionsDTO extends LoadExchangeRatesDTO {
    systemTransactions: SystemTransaction[]
}

type ToSystemTransactions = (
    input: LoadExchangeRatesDTO
) => ToSystemTransactionsDTO

export const toSystemTransactions: ToSystemTransactions = (input) => {
    const { sourceTransactions, bank, exchangeRatesMap, addMessage } = input

    addMessage('Adding reference amount to transactions...')

    const systemTransactions = sourceTransactions.map((transaction) => {
        const referenceCurrencyCode = currency.usdNumCode
        const referenceAmount =
            transaction.operationCurrencyCode === currency.usdNumCode
                ? transaction.operationAmount
                : calculateRefAmount(transaction, exchangeRatesMap)

        return {
            ...transaction,
            id: crypto.randomUUID(),
            bank,
            referenceAmount,
            referenceCurrencyCode,
            category: null,
            capitalized: false,
            hide: false,
            labels: [],
            subTransactions: [],
            comment: transaction.comment || '',
        }
    })

    return {
        ...input,
        systemTransactions,
    }
}

function calculateRefAmount(
    transaction: SourceTransaction,
    exchangeRatesMap: LoadExchangeRatesDTO['exchangeRatesMap']
): bigint {
    const key = encodeKey(transaction)

    const rate = exchangeRatesMap.get(key)

    if (!rate) {
        throw new Error(`Exchange rate not found for ${key}`)
    }

    return BigInt(Math.round(Number(transaction.operationAmount) * rate))
}
