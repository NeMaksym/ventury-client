import { MonoAPITransaction } from './monoAPI'

/**
 * Represents the base structure for a financial transaction.
 * @interface TransactionBase
 * @property {string} id - Unique identifier for the transaction
 * @property {string} originalId - Original identifier from the source system
 * @property {string} bank - The name or identifier of the bank where the transaction occurred
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
    id: string
    originalId: string
    bank: string
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

/**
 * Represents a Mono bank transaction.
 * @interface MonoTransaction
 * @extends TransactionBase
 * @property {'mono'} bank - Bank identifier for Mono
 * @property {string} iban - IBAN associated with the transaction
 * @property {number} mcc - Merchant Category Code
 * @property {number} commissionRate - Commission rate for the transaction
 * @property {boolean} hold - Indicates if the transaction is on hold
 */
interface MonoTransaction
    extends TransactionBase,
        Pick<MonoAPITransaction, 'mcc' | 'commissionRate' | 'hold'> {
    bank: 'mono'
    iban: string
}

/**
 * Represents a Private bank transaction.
 * @interface PrivateTransaction
 * @extends TransactionBase
 * @property {'private'} bank - Bank identifier for Private
 * @property {string} maskedPan - Masked PAN (card number) associated with the transaction
 */
interface PrivateTransaction extends TransactionBase {
    bank: 'private'
    maskedPan: string
}

/**
 * Union type for all supported bank transactions.
 * @typedef {MonoTransaction | PrivateTransaction} Transaction
 */
export type Transaction = MonoTransaction | PrivateTransaction
