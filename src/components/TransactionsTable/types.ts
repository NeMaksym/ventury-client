import { SystemTransaction } from '../../types'

export type TransactionActionHandler<T> = (
    transactionId: string,
    value: T,
    subTransactionId?: string
) => void

export type TransactionDeleteHandler = (
    transactionId: string,
    subTransactionId?: string
) => void

export type TableTransaction = Pick<
    SystemTransaction,
    | 'time'
    | 'bank'
    | 'amount'
    | 'currencyCode'
    | 'referenceAmount'
    | 'referenceCurrencyCode'
    | 'description'
    | 'comment'
    | 'category'
    | 'labels'
    | 'hide'
    | 'capitalized'
> & {
    transactionId: string
}

export type TableSubTransaction = TableTransaction & {
    subTransactionId: string
}

export type TransactionRow = TableTransaction | TableSubTransaction
