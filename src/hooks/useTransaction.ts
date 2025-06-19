import { useCallback } from 'react'
import { SystemTransaction, SystemSubTransaction } from '../types'
import { useExpenseService } from './useExpenseService'
import { toSmallestUnit } from '../utils/formatAmount'
import { SubTransactionData } from '../components/TransactionsTable'

interface UseTransactionParams {
    setTransactions: React.Dispatch<React.SetStateAction<SystemTransaction[]>>
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

export const useTransaction = ({
    setTransactions,
    setError,
}: UseTransactionParams) => {
    const { getTransactionById, updateTransaction, deleteTransaction } =
        useExpenseService()

    const updateTransactionField = useCallback(
        async (
            transactionId: string,
            updates: Partial<SystemTransaction>,
            errorMessage: string,
            subTransactionId?: string
        ) => {
            try {
                const transaction = await getTransactionById(transactionId)
                if (!transaction) return

                const payload =
                    subTransactionId && transaction.subTransactions
                        ? {
                              ...transaction,
                              subTransactions: transaction.subTransactions.map(
                                  (st) =>
                                      st.id === subTransactionId
                                          ? { ...st, ...updates }
                                          : st
                              ),
                          }
                        : {
                              ...transaction,
                              ...updates,
                          }

                const updatedTransaction = await updateTransaction(payload)

                setTransactions((prevTransactions) =>
                    prevTransactions.map((t) =>
                        t.id === transactionId ? updatedTransaction : t
                    )
                )
            } catch (err) {
                setError(err instanceof Error ? err.message : errorMessage)
            }
        },
        [getTransactionById, updateTransaction, setTransactions, setError]
    )

    const handleCommentChange = useCallback(
        (transactionId: string, comment: string, subTransactionId?: string) => {
            return updateTransactionField(
                transactionId,
                { comment },
                'Failed to update comment',
                subTransactionId
            )
        },
        [updateTransactionField]
    )

    const handleCategoryChange = useCallback(
        (
            transactionId: string,
            category: string | null,
            subTransactionId?: string
        ) => {
            return updateTransactionField(
                transactionId,
                { category },
                'Failed to update category',
                subTransactionId
            )
        },
        [updateTransactionField]
    )

    const handleLabelChange = useCallback(
        (
            transactionId: string,
            labels: string[],
            subTransactionId?: string
        ) => {
            return updateTransactionField(
                transactionId,
                { labels },
                'Failed to update labels',
                subTransactionId
            )
        },
        [updateTransactionField]
    )

    const handleHideChange = useCallback(
        (transactionId: string, hide: boolean, subTransactionId?: string) => {
            return updateTransactionField(
                transactionId,
                { hide },
                'Failed to update hide status',
                subTransactionId
            )
        },
        [updateTransactionField]
    )

    const handleCapitalizeChange = useCallback(
        (
            transactionId: string,
            capitalized: boolean,
            subTransactionId?: string
        ) => {
            return updateTransactionField(
                transactionId,
                { capitalized },
                'Failed to update capitalization status',
                subTransactionId
            )
        },
        [updateTransactionField]
    )

    const handleDelete = useCallback(
        async (transactionId: string, subTransactionId?: string) => {
            try {
                const transaction = await getTransactionById(transactionId)
                if (!transaction) return

                if (subTransactionId && transaction.subTransactions) {
                    const updatedTransaction = await updateTransaction({
                        ...transaction,
                        subTransactions: transaction.subTransactions.filter(
                            (st) => st.id !== subTransactionId
                        ),
                    })

                    setTransactions((prevTransactions) =>
                        prevTransactions.map((t) =>
                            t.id === transactionId ? updatedTransaction : t
                        )
                    )
                } else {
                    await deleteTransaction(transactionId)

                    setTransactions((prevTransactions) =>
                        prevTransactions.filter((t) => t.id !== transactionId)
                    )
                }
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to delete transaction'
                )
            }
        },
        [getTransactionById, deleteTransaction, setTransactions, setError]
    )

    const handleSubTransactionCreate = useCallback(
        async (transactionId: string, data: SubTransactionData) => {
            try {
                const transaction = await getTransactionById(transactionId)
                if (!transaction) {
                    setError('Transaction not found')
                    return
                }

                const exchangeRate =
                    Number(transaction.referenceAmount) /
                    Number(transaction.amount)

                const newSubTransaction: SystemSubTransaction = {
                    id: crypto.randomUUID(),
                    description: data.description,
                    amount: -toSmallestUnit(data.amount),
                    referenceAmount: -toSmallestUnit(
                        data.amount * exchangeRate
                    ),
                    category: null,
                    capitalized: false,
                    hide: false,
                    labels: [],
                }

                const updatedTransaction = await updateTransaction({
                    ...transaction,
                    subTransactions: [
                        ...(transaction.subTransactions ?? []),
                        newSubTransaction,
                    ],
                })

                setTransactions((prevTransactions) =>
                    prevTransactions.map((t) =>
                        t.id === transactionId ? updatedTransaction : t
                    )
                )
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to create sub-transaction'
                )
            }
        },
        [getTransactionById, updateTransaction, setTransactions, setError]
    )

    return {
        handleCommentChange,
        handleCategoryChange,
        handleLabelChange,
        handleHideChange,
        handleCapitalizeChange,
        handleDelete,
        handleSubTransactionCreate,
    }
}
