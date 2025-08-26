import { AddMessage } from '../../../hooks'
import { Bank, SourceTransaction } from '../../../types'
import { currency } from '../../../utils'

function isValidUnixMillis(value: number): boolean {
    return (
        typeof value === 'number' &&
        Number.isFinite(value) &&
        new Date(value).getTime() === value
    )
}

export interface PipelineInput {
    sourceTransactions: SourceTransaction[]
    addMessage: AddMessage
    bank: Bank
}

export function validate(input: PipelineInput): PipelineInput {
    input.sourceTransactions.forEach((transaction) => {
        if (!isValidUnixMillis(transaction.time)) {
            throw new Error('Time should be number in unix milliseconds')
        }

        if (!currency.numToAlpha(transaction.currencyCode)) {
            throw new Error('Invalid currency code')
        }

        if (transaction.operation) {
            if (transaction.operation.amount <= 0) {
                throw new Error('Operation amount should be positive')
            }
            if (!currency.numToAlpha(transaction.operation.currencyCode)) {
                throw new Error('Invalid operation currency code')
            }
        }

        if (transaction.commissionRate) {
            if (transaction.commissionRate < 0) {
                throw new Error('Commission rate should be positive')
            }
        }
    })

    return input
}
