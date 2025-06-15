import { useCallback } from 'react'
import { SystemTransaction } from '../../types'
import { useExpenseService } from '../../hooks'

interface UseCommentParams {
    setTransactions: React.Dispatch<React.SetStateAction<SystemTransaction[]>>
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

export const useComment = ({ setTransactions, setError }: UseCommentParams) => {
    const { getTransactionById, updateTransaction } = useExpenseService()

    const handleCommentChange = useCallback(
        async (transactionId: string, comment: string) => {
            try {
                const transaction = await getTransactionById(transactionId)
                if (!transaction) return

                const updatedTransaction = await updateTransaction({
                    ...transaction,
                    comment,
                })

                setTransactions((prevTransactions) =>
                    prevTransactions.map((t) =>
                        t.id === transactionId ? updatedTransaction : t
                    )
                )
            } catch (err) {
                console.error('Failed to update comment:', err)
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to update comment'
                )
            }
        },
        [getTransactionById, updateTransaction, setTransactions, setError]
    )

    return { handleCommentChange }
}
