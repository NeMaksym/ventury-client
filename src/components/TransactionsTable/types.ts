export type TransactionActionHandler<T> = (
    transactionId: string,
    value: T,
    subTransactionId?: string
) => void

export type TransactionDeleteHandler = (
    transactionId: string,
    subTransactionId?: string
) => void

export interface SubTransactionData {
    description: string
    amount: number
}

export type SubTransactionCreateHandler = (
    transactionId: string,
    data: SubTransactionData
) => void
