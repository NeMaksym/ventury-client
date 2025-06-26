import { useEffect, useState, useMemo } from 'react'
import { useExpenseService } from './useExpenseService'
import { toSmallestUnit, fromSmallestUnit } from '../utils/formatAmount'
import {
    Filters,
    shouldShowTransaction,
    shouldShowSubTransaction,
} from './useFilterValues'
import { SystemTransaction, SystemSubTransaction } from '../types'
import {
    TableTransaction,
    TableSubTransaction,
    TransactionRow,
} from '../components/TransactionsTable/types'

export const useExpenses = (filters: Filters) => {
    const {
        getTransactionsByDateRange,
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

        const startDate = new Date(filters.startDate + 'T00:00:00')
        const endDate = new Date(filters.endDate + 'T23:59:59')

        getTransactionsByDateRange(startDate, endDate)
            .then((data) =>
                data.sort((a, b) => b.time.getTime() - a.time.getTime())
            )
            .then(setTransactions)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [getTransactionsByDateRange, filters.startDate, filters.endDate])

    const rows = useMemo<TransactionRow[]>(() => {
        const result = []

        for (const transaction of transactions) {
            if (shouldShowTransaction(transaction, filters)) {
                result.push(toTableTransaction(transaction))
            }

            for (const subTransaction of transaction.subTransactions) {
                if (
                    shouldShowSubTransaction(
                        transaction,
                        subTransaction,
                        filters
                    )
                ) {
                    result.push(
                        toTableSubTransaction(transaction, subTransaction)
                    )
                }
            }
        }

        return result
    }, [transactions, filters.banks, filters.categories, filters.labels])

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

    return { loading, error, rows, handlers }
}

function toTableTransaction(transaction: SystemTransaction): TableTransaction {
    const subTransactionsSum = transaction.subTransactions.reduce(
        (sum, sub) => sum + sub.amount,
        0n
    )
    const subTransactionsRefSum = transaction.subTransactions.reduce(
        (sum, sub) => sum + sub.referenceAmount,
        0n
    )
    const transactionAmount = transaction.amount - subTransactionsSum
    const transactionRefAmount =
        transaction.referenceAmount - subTransactionsRefSum

    return {
        transactionId: transaction.id,
        time: transaction.time,
        bank: transaction.bank,
        amount: -fromSmallestUnit(transactionAmount),
        currencyCode: transaction.currencyCode,
        referenceAmount: fromSmallestUnit(transactionRefAmount),
        referenceCurrencyCode: transaction.referenceCurrencyCode,
        description: transaction.description,
        comment: transaction.comment,
        category: transaction.category,
        labels: transaction.labels,
        hide: transaction.hide,
        capitalized: transaction.capitalized,
    }
}

function toTableSubTransaction(
    transaction: SystemTransaction,
    subTransaction: SystemSubTransaction
): TableSubTransaction {
    return {
        transactionId: transaction.id,
        subTransactionId: subTransaction.id,
        time: transaction.time,
        bank: transaction.bank,
        amount: -fromSmallestUnit(subTransaction.amount),
        currencyCode: transaction.currencyCode,
        referenceAmount: fromSmallestUnit(subTransaction.referenceAmount),
        referenceCurrencyCode: transaction.referenceCurrencyCode,
        description: transaction.description,
        comment: subTransaction.comment,
        category: subTransaction.category,
        labels: subTransaction.labels,
        hide: subTransaction.hide,
        capitalized: subTransaction.capitalized,
    }
}
