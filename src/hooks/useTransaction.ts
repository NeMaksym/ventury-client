import { useCallback } from 'react'
import { SystemTransaction, SystemSubTransaction } from '../types'
import { useExpenseService } from './useExpenseService'

export type SubTransactionData = Pick<
    SystemSubTransaction,
    'description' | 'amount'
>

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
            errorMessage: string
        ) => {
            try {
                const transaction = await getTransactionById(transactionId)
                if (!transaction) return

                const updatedTransaction = await updateTransaction({
                    ...transaction,
                    ...updates,
                })

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
        (transactionId: string, comment: string) => {
            return updateTransactionField(
                transactionId,
                { comment },
                'Failed to update comment'
            )
        },
        [updateTransactionField]
    )

    const handleCategoryChange = useCallback(
        (transactionId: string, category: string | null) => {
            return updateTransactionField(
                transactionId,
                { category },
                'Failed to update category'
            )
        },
        [updateTransactionField]
    )

    const handleLabelChange = useCallback(
        (transactionId: string, labels: string[]) => {
            return updateTransactionField(
                transactionId,
                { labels },
                'Failed to update labels'
            )
        },
        [updateTransactionField]
    )

    const handleHideChange = useCallback(
        (transactionId: string, hide: boolean) => {
            return updateTransactionField(
                transactionId,
                { hide },
                'Failed to update hide status'
            )
        },
        [updateTransactionField]
    )

    const handleCapitalizeChange = useCallback(
        (transactionId: string, capitalized: boolean) => {
            return updateTransactionField(
                transactionId,
                { capitalized },
                'Failed to update capitalization status'
            )
        },
        [updateTransactionField]
    )

    const handleDelete = useCallback(
        async (transactionId: string) => {
            try {
                await deleteTransaction(transactionId)

                setTransactions((prevTransactions) =>
                    prevTransactions.filter((t) => t.id !== transactionId)
                )
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to delete transaction'
                )
            }
        },
        [deleteTransaction, setTransactions, setError]
    )

    const handleSubTransactionCreate = useCallback(
        (transactionId: string, data: SubTransactionData) => {
            console.log(transactionId, data)
        },
        []
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
