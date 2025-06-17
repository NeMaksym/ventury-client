import { useCallback } from 'react'
import { SystemTransaction } from '../../types'
import { useExpenseService } from '../../hooks'

interface UseHideParams {
    setTransactions: React.Dispatch<React.SetStateAction<SystemTransaction[]>>
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

export const useHide = ({ setTransactions, setError }: UseHideParams) => {
    const { getTransactionById, updateTransaction } = useExpenseService()

    const handleHideChange = useCallback(
        async (transactionId: string, hide: boolean) => {
            try {
                const transaction = await getTransactionById(transactionId)
                if (!transaction) return

                const updatedTransaction = await updateTransaction({
                    ...transaction,
                    hide,
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
                        : 'Failed to update hide status'
                )
            }
        },
        [getTransactionById, updateTransaction, setTransactions, setError]
    )

    return { handleHideChange }
}
