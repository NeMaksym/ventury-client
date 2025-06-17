import { useCallback } from 'react'
import { SystemTransaction } from '../../types'
import { useExpenseService } from '../../hooks'

interface UseCategoryParams {
    setTransactions: React.Dispatch<React.SetStateAction<SystemTransaction[]>>
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

export const useCategory = ({
    setTransactions,
    setError,
}: UseCategoryParams) => {
    const { getTransactionById, updateTransaction } = useExpenseService()

    const handleCategoryChange = useCallback(
        async (transactionId: string, category: string | null) => {
            try {
                const transaction = await getTransactionById(transactionId)
                if (!transaction) return

                const updatedTransaction = await updateTransaction({
                    ...transaction,
                    category,
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
                        : 'Failed to update category'
                )
            }
        },
        [getTransactionById, updateTransaction, setTransactions, setError]
    )

    return { handleCategoryChange }
}
