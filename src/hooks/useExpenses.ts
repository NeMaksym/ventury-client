import { useEffect, useState, useMemo } from 'react'
import { SystemTransaction, SystemSubTransaction } from '../types'
import { useExpenseService } from './useExpenseService'
import { toSmallestUnit } from '../utils/formatAmount'
import { Filters } from './useFilterValues'

export const useExpenses = (filters: Filters) => {
    const {
        getAllTransactions,
        getTransactionById,
        updateTransaction,
        deleteTransaction,
    } = useExpenseService()

    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [transactions, setTransactions] = useState<SystemTransaction[]>([])

    useEffect(() => {
        setLoading(true)
        setError(null)

        getAllTransactions()
            .then((data) =>
                data.sort((a, b) => b.time.getTime() - a.time.getTime())
            )
            .then(setTransactions)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [getAllTransactions, filters])

    const updateTransactionField = async (
        transactionId: string,
        updates: Partial<SystemTransaction>,
        errorMessage: string,
        subTransactionId?: string
    ) => {
        try {
            const transaction = await getTransactionById(transactionId)
            if (!transaction) return

            const payload = subTransactionId
                ? {
                      ...transaction,
                      subTransactions: transaction.subTransactions.map((st) =>
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
    }

    const handlers = useMemo(
        () => ({
            onCommentChange: (
                transactionId: string,
                comment: string,
                subTransactionId?: string
            ) => {
                return updateTransactionField(
                    transactionId,
                    { comment },
                    'Failed to update comment',
                    subTransactionId
                )
            },

            onCategoryChange: (
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

            onLabelChange: (
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

            onHideChange: (
                transactionId: string,
                hide: boolean,
                subTransactionId?: string
            ) => {
                return updateTransactionField(
                    transactionId,
                    { hide },
                    'Failed to update hide status',
                    subTransactionId
                )
            },

            onCapitalizeChange: (
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

            onDelete: async (
                transactionId: string,
                subTransactionId?: string
            ) => {
                try {
                    const transaction = await getTransactionById(transactionId)
                    if (!transaction) return

                    if (subTransactionId) {
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
                            prevTransactions.filter(
                                (t) => t.id !== transactionId
                            )
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

            onSubTransactionCreate: async (
                transactionId: string,
                amount: number
            ) => {
                try {
                    const transaction = await getTransactionById(transactionId)
                    if (!transaction) {
                        setError('Transaction not found')
                        return
                    }

                    const exchangeRate =
                        Number(transaction.referenceAmount) /
                        Number(-transaction.amount)

                    const newSubTransaction: SystemSubTransaction = {
                        id: crypto.randomUUID(),
                        amount: -toSmallestUnit(amount),
                        referenceAmount: toSmallestUnit(amount * exchangeRate),
                        category: null,
                        capitalized: false,
                        hide: false,
                        labels: [],
                        comment: '',
                    }

                    const updatedTransaction = await updateTransaction({
                        ...transaction,
                        subTransactions: [
                            ...transaction.subTransactions,
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
        }),
        [
            updateTransactionField,
            getTransactionById,
            updateTransaction,
            deleteTransaction,
            setTransactions,
            setError,
        ]
    )

    return { loading, error, transactions, handlers }
}
