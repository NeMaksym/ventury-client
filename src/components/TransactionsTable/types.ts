import { SystemTransaction, SystemSubTransaction } from '../../types'

export type TransactionActionHandler<T> = (
    transactionId: string,
    value: T,
    subTransactionId?: string
) => void

export type TransactionDeleteHandler = (
    transactionId: string,
    subTransactionId?: string
) => void

export type TransactionRow = SystemTransaction | SystemSubTransaction
