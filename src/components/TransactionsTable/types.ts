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
    | 'currencyCode'
    | 'referenceCurrencyCode'
    | 'description'
    | 'comment'
    | 'category'
    | 'labels'
    | 'hide'
    | 'capitalized'
> & {
    transactionId: string
    amount: number
    referenceAmount: number
}

export type TableSubTransaction = TableTransaction & {
    subTransactionId: string
}

export type TransactionRow = TableTransaction | TableSubTransaction
