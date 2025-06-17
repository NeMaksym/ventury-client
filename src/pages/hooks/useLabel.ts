import { useCallback } from 'react'
import { SystemTransaction } from '../../types'
import { useExpenseService } from '../../hooks'

interface UseLabelParams {
    setTransactions: React.Dispatch<React.SetStateAction<SystemTransaction[]>>
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

export const useLabel = ({ setTransactions, setError }: UseLabelParams) => {
    const { getTransactionById, updateTransaction } = useExpenseService()

    const handleLabelChange = useCallback(
        async (transactionId: string, labels: string[]) => {
            try {
                const transaction = await getTransactionById(transactionId)
                if (!transaction) return

                const updatedTransaction = await updateTransaction({
                    ...transaction,
                    labels,
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
                        : 'Failed to update labels'
                )
            }
        },
        [getTransactionById, updateTransaction, setTransactions, setError]
    )

    return { handleLabelChange }
}
