import { useCallback } from 'react'
import { SystemTransaction } from '../../types'
import { useExpenseService } from '../../hooks'

interface UseCapitalizeParams {
    setTransactions: React.Dispatch<React.SetStateAction<SystemTransaction[]>>
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

export const useCapitalize = ({
    setTransactions,
    setError,
}: UseCapitalizeParams) => {
    const { getTransactionById, updateTransaction } = useExpenseService()

    const handleCapitalizeChange = useCallback(
        async (transactionId: string, capitalized: boolean) => {
            try {
                const transaction = await getTransactionById(transactionId)
                if (!transaction) return

                const updatedTransaction = await updateTransaction({
                    ...transaction,
                    capitalized,
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
                        : 'Failed to update capitalization status'
                )
            }
        },
        [getTransactionById, updateTransaction, setTransactions, setError]
    )

    return { handleCapitalizeChange }
}
