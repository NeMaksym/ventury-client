import { MonoAPITransaction } from './monoAPI'

/**
 * Represents the base structure for a financial transaction.
 * @interface TransactionBase
 * @property {string} bank - The name or identifier of the bank where the transaction occurred
 * @property {string} id - Unique identifier for the transaction
 * @property {bigint} time - Timestamp of when the transaction occurred
 * @property {string} description - Description or details of the transaction
 * @property {bigint} amount - The transaction amount in the smallest currency unit (e.g., cents)
 * @property {number} currencyCode - Numerical code representing the transaction currency
 * @property {bigint} operationAmount - The operation amount in the smallest currency unit
 * @property {number} operationCurrencyCode - Numerical code representing the operation currency
 * @property {string} [comment] - Optional additional comments about the transaction
 * @property {string} [category] - Optional category classification of the transaction
 * @property {string[]} [labels] - Optional array of labels or tags associated with the transaction
 */
interface TransactionBase {
    bank: string
    id: string
    time: bigint
    description: string
    amount: bigint
    currencyCode: number
    operationAmount: bigint
    operationCurrencyCode: number
    comment?: string
    category?: string
    labels?: string[]
}

interface MonoTransaction
    extends TransactionBase,
        Pick<MonoAPITransaction, 'mcc' | 'commissionRate' | 'hold'> {
    bank: 'mono'
    iban: string
}

interface PrivateTransaction extends TransactionBase {
    bank: 'private'
    maskedPan: string
}

export type Transaction = MonoTransaction | PrivateTransaction
