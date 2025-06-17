/**
 * Supported bank types in the system.
 */
export type Bank = 'mono' | 'private'

/**
 * Represents different types of account identifiers.
 * @type AccountId
 * @property {Object} iban - International Bank Account Number identifier
 * @property {'iban'} iban.type - Identifier type set to 'iban'
 * @property {string} iban.value - The IBAN string value
 * @property {Object} maskedPan - Masked Primary Account Number identifier
 * @property {'maskedPan'} maskedPan.type - Identifier type set to 'maskedPan'
 * @property {string} maskedPan.value - The masked PAN string value
 */
type AccountId =
    | { type: 'iban'; value: string }
    | { type: 'maskedPan'; value: string }

/**
 * Represents commission information for a transaction.
 * @interface Commission
 * @property {bigint} rate - Commission rate in the smallest currency unit
 * @property {number} currencyCode - Numerical code representing the commission currency
 */
interface Commission {
    rate: bigint
    currencyCode: number
}

/**
 * Represents the structure for a financial transaction from external sources.
 * @interface SourceTransaction
 * @property {string | null} originalId - Original identifier from the source system (usually transaction id from external source)
 * @property {Date} time - Timestamp of when the transaction occurred
 * @property {string} description - Description or details of the transaction
 * @property {bigint} amount - Transaction amount in the smallest currency unit (e.g., cents)
 * @property {number} currencyCode - Numerical currency code (ISO 4217)
 * @property {bigint} operationAmount - Operation amount in the smallest currency unit
 * @property {number} operationCurrencyCode - Numerical currency code (ISO 4217) for the operation
 * @property {AccountId} accountId - Account identifier
 * @property {string} [comment] - Optional additional comments about the transaction
 * @property {Commission} [commission] - Optional commission information for the transaction
 * @property {number} [mcc] - Optional Merchant Category Code (MCC) for categorizing the transaction
 * @property {boolean} [hold] - Optional flag indicating if the transaction is on hold
 */
export interface SourceTransaction {
    originalId: string | null
    time: Date
    description: string
    amount: bigint
    currencyCode: number
    operationAmount: bigint
    operationCurrencyCode: number
    accountId: AccountId
    comment?: string
    commission?: Commission
    mcc?: number
    hold?: boolean
}

/**
 * Represents a transaction with additional system-level metadata.
 * @interface SystemTransaction
 * @extends SourceTransaction
 * @property {string} id - Unique identifier for the transaction
 * @property {Bank} bank - The bank that originated this transaction
 * @property {bigint} referenceAmount - Reference amount in the smallest currency unit for comparison
 * @property {number} referenceCurrencyCode - Numerical code representing the reference currency
 * @property {string | null} category - System-assigned category for the transaction, null if uncategorized
 * @property {string[]} [labels] - Optional array of system-assigned labels or tags
 */
export interface SystemTransaction
    extends Pick<
        SourceTransaction,
        | 'originalId'
        | 'time'
        | 'description'
        | 'amount'
        | 'currencyCode'
        | 'operationAmount'
        | 'operationCurrencyCode'
        | 'accountId'
        | 'comment'
        | 'mcc'
        | 'hold'
    > {
    id: string
    bank: Bank
    referenceAmount: bigint
    referenceCurrencyCode: number
    category: string | null
    capitalized: boolean
    hide: boolean
    labels?: string[]
}

/**
 * Props interface for uploader components.
 * @interface UploaderProps
 * @property {function} uploadData - Callback function to handle uploaded transaction data
 * @property {SourceTransaction[]} uploadData.data - Array of source transactions to upload
 */
export interface UploaderProps {
    uploadData: (data: SourceTransaction[]) => void
}

/**
 * Represents a bank plugin configuration for the system.
 * @interface BankPlugin
 * @property {string} country - Country code where the bank operates (ISO 3166-1 alpha-2 )
 * @property {string} label - Human-readable name of the bank
 * @property {React.ComponentType<UploaderProps>} Uploader - React component for handling file uploads for this bank
 */
export interface BankPlugin {
    country: string
    label: string
    Uploader: React.ComponentType<UploaderProps>
}
