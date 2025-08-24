import { AddMessage } from '../../../hooks'
import { Bank, SourceTransaction } from '../../../types'
import { currency } from '../../../utils'

export interface PipelineInput {
    sourceTransactions: SourceTransaction[]
    addMessage: AddMessage
    bank: Bank
}

export function validate(input: PipelineInput): PipelineInput {
    input.sourceTransactions.forEach((transaction) => {
        if (transaction.operationAmount < 0) {
            throw new Error('Operation amount should be positive')
        }

        if (!(transaction.time instanceof Date)) {
            throw new Error('Time should be a date')
        }

        if (!currency.numToAlpha(transaction.currencyCode)) {
            throw new Error('Invalid currency code')
        }

        if (!currency.numToAlpha(transaction.operationCurrencyCode)) {
            throw new Error('Invalid operation currency code')
        }

        if (transaction.commissionRate && transaction.commissionRate < 0) {
            throw new Error('Commission rate should be positive')
        }
    })

    return input
}
