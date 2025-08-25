/**
 * Supported bank types in the system.
 */
export type Bank = 'mono' | 'privatBank' | 'privatBankBusiness'

/**
 * Represents a category in the system.
 * @interface Category
 * @property {string} id - Unique identifier for the category
 * @property {string} label - Human-readable name of the category
 */
export type Category = {
    id: string
    label: string
}

/**
 * Represents different types of account data.
 * @type Account
 * @property {Object} maskedPan - Masked Primary Account Number
 * @property {string} maskedPan.value - The masked PAN string value
 * @property {Object} iban - International Bank Account Number
 * @property {string} iban.value.iban - The IBAN string value
 * @property {string[]} iban.value.maskedPan - Array of masked PANs. Empty if no cards. Some accounts have multiple cards.
 */
type Account =
    | { type: 'maskedPan'; value: string }
    | { type: 'iban'; value: { iban: string; maskedPan: string[] } }

/**
 * Represents the structure for a financial transaction from external sources.
 * @interface SourceTransaction
 * @property {string | null} originalId - Original identifier from the source system (usually transaction id from external source)
 * @property {Date} time - Timestamp of when the transaction occurred
 * @property {string} description - Description or details of the transaction
 * @property {number} amount - Transaction amount in the smallest account currency unit (e.g., cents)
 * @property {number} currencyCode - Numerical account currency code (ISO 4217)
 * @property {number} operationAmount - Operation amount in the smallest currency unit
 * @property {number} operationCurrencyCode - Numerical operation currency code (ISO 4217)
 * @property {Account} account - Account info
 * @property {string} [comment] - Optional additional comments about the transaction
 * @property {number} [commissionRate] - Optional commission rate for the transaction in the smallest *account* currency unit.
 * @property {number} [mcc] - Optional Merchant Category Code (MCC) for categorizing the transaction
 * @property {boolean} [hold] - Optional flag indicating if the transaction is on hold
 */
export interface SourceTransaction {
    originalId: string | null
    time: Date
    description: string
    amount: number
    currencyCode: number
    operationAmount: number
    operationCurrencyCode: number
    account: Account
    comment?: string
    commissionRate?: number
    mcc?: number
    hold?: boolean
}

/**
 * Represents a transaction with additional system-level metadata.
 * @interface SystemTransaction
 * @extends SourceTransaction
 * @property {string} id - Unique identifier for the transaction
 * @property {Bank} bank - The bank that originated this transaction
 * @property {number} referenceAmount - Reference amount in the smallest currency unit for comparison
 * @property {number} referenceCurrencyCode - Numerical code representing the reference currency
 * @property {Category['id'] | ''} category - System-assigned category for the transaction, empty string if uncategorized
 * @property {string[]} labels - Array of system-assigned labels or tags
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
        | 'account'
        | 'comment'
        | 'mcc'
        | 'hold'
    > {
    id: string
    bank: Bank
    referenceAmount: number
    referenceCurrencyCode: number
    category: Category['id'] | ''
    capitalized: boolean
    hide: boolean
    labels: string[]
    comment: string
}

/**
 * Represents a sub-transaction of a system transaction.
 * @interface SystemSubTransaction
 * @extends SystemTransaction
 * @property {string} parentId - Unique identifier for the parent transaction
 */
export interface SystemSubTransaction
    extends Pick<
        SystemTransaction,
        | 'id'
        | 'time'
        | 'description'
        | 'amount'
        | 'currencyCode'
        | 'account'
        | 'bank'
        | 'referenceAmount'
        | 'referenceCurrencyCode'
        | 'category'
        | 'capitalized'
        | 'hide'
        | 'labels'
        | 'comment'
    > {
    parentId: string
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

// TODO: Add bank icon
// TODO: Add .md upload instruction
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
