import { useEffect, useState, useMemo } from 'react'
import { useExpenseService, useSubExpenseService } from '../db'
import { Filters } from './useFilterValues'
import { SystemTransaction, SystemSubTransaction } from '../types'
import { toSmallestUnit } from '../utils/formatAmount'

export const useExpenses = (filters: Filters) => {
    const {
        getExpensesByDateRange,
        getExpenseById,
        updateExpense,
        deleteExpense,
    } = useExpenseService()

    const {
        getSubExpensesByDateRange,
        getSubExpenseById,
        updateSubExpense,
        deleteSubExpense,
        addSubExpense,
    } = useSubExpenseService()

    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [expenses, setExpenses] = useState<SystemTransaction[]>([])
    const [subExpenses, setSubExpenses] = useState<SystemSubTransaction[]>([])

    useEffect(() => {
        setLoading(true)
        setError(null)

        async function fetchExpenses() {
            const startDate = new Date(filters.startDate + 'T00:00:00')
            const endDate = new Date(filters.endDate + 'T23:59:59')

            const [expenses, subExpenses] = await Promise.all([
                getExpensesByDateRange(startDate, endDate),
                getSubExpensesByDateRange(startDate, endDate),
            ])

            setExpenses(expenses)
            setSubExpenses(subExpenses)
        }

        fetchExpenses()
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [
        getExpensesByDateRange,
        getSubExpensesByDateRange,
        filters.startDate,
        filters.endDate,
    ])

    const updateExpenseField = async (
        expenseId: string,
        updates: Partial<SystemTransaction>,
        errorMessage: string
    ) => {
        try {
            const expense = await getExpenseById(expenseId)
            if (!expense) return

            const updatedExpense = await updateExpense({
                ...expense,
                ...updates,
            })

            setExpenses((prevExpenses) =>
                prevExpenses.map((e) =>
                    e.id === expenseId ? updatedExpense : e
                )
            )
        } catch (err) {
            setError(err instanceof Error ? err.message : errorMessage)
        }
    }

    const updateSubExpenseField = async (
        subExpenseId: string,
        updates: Partial<SystemSubTransaction>,
        errorMessage: string
    ) => {
        try {
            const subExpense = await getSubExpenseById(subExpenseId)
            if (!subExpense) return

            const updatedSubExpense = await updateSubExpense({
                ...subExpense,
                ...updates,
            })

            setSubExpenses((prevSubExpenses) => {
                return prevSubExpenses.map((subExpense) =>
                    subExpense.id === subExpenseId
                        ? updatedSubExpense
                        : subExpense
                )
            })
        } catch (err) {
            setError(err instanceof Error ? err.message : errorMessage)
        }
    }

    const handlers = useMemo(
        () => ({
            onCommentChange: (
                expenseId: string,
                comment: string,
                subExpenseId?: string
            ) => {
                return subExpenseId
                    ? updateSubExpenseField(
                          subExpenseId,
                          { comment },
                          'Failed to update comment'
                      )
                    : updateExpenseField(
                          expenseId,
                          { comment },
                          'Failed to update comment'
                      )
            },

            onCategoryChange: (
                expenseId: string,
                category: string,
                subExpenseId?: string
            ) => {
                return subExpenseId
                    ? updateSubExpenseField(
                          subExpenseId,
                          { category },
                          'Failed to update category'
                      )
                    : updateExpenseField(
                          expenseId,
                          { category },
                          'Failed to update category'
                      )
            },

            onLabelChange: (
                expenseId: string,
                labels: string[],
                subExpenseId?: string
            ) => {
                return subExpenseId
                    ? updateSubExpenseField(
                          subExpenseId,
                          { labels },
                          'Failed to update labels'
                      )
                    : updateExpenseField(
                          expenseId,
                          { labels },
                          'Failed to update labels'
                      )
            },

            onHideChange: (
                expenseId: string,
                hide: boolean,
                subExpenseId?: string
            ) => {
                return subExpenseId
                    ? updateSubExpenseField(
                          subExpenseId,
                          { hide },
                          'Failed to update hide status'
                      )
                    : updateExpenseField(
                          expenseId,
                          { hide },
                          'Failed to update hide status'
                      )
            },

            onCapitalizeChange: (
                expenseId: string,
                capitalized: boolean,
                subExpenseId?: string
            ) => {
                return subExpenseId
                    ? updateSubExpenseField(
                          subExpenseId,
                          { capitalized },
                          'Failed to update capitalization status'
                      )
                    : updateExpenseField(
                          expenseId,
                          { capitalized },
                          'Failed to update capitalization status'
                      )
            },

            onDelete: async (expenseId: string, subExpenseId?: string) => {
                try {
                    if (subExpenseId) {
                        await deleteSubExpense(subExpenseId)
                        setSubExpenses((prevSubExpenses) => {
                            return prevSubExpenses.filter(
                                (subExpense) => subExpense.id !== subExpenseId
                            )
                        })
                    } else {
                        await deleteExpense(expenseId)
                        setExpenses((prevExpenses) =>
                            prevExpenses.filter(
                                (expense) => expense.id !== expenseId
                            )
                        )
                    }
                } catch (err) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : 'Failed to delete expense'
                    )
                }
            },

            onSubTransactionCreate: async (
                expenseId: string,
                amount: number
            ) => {
                try {
                    const expense = await getExpenseById(expenseId)
                    if (!expense) {
                        setError('Expense not found')
                        return
                    }

                    const exchangeRate =
                        Number(expense.referenceAmount) /
                        Number(-expense.amount)

                    const newSubExpense = await addSubExpense({
                        // inherited
                        parentId: expenseId,
                        accountId: expense.accountId,
                        bank: expense.bank,
                        time: expense.time,
                        description: expense.description,
                        currencyCode: expense.currencyCode,
                        referenceCurrencyCode: expense.referenceCurrencyCode,
                        // own
                        id: crypto.randomUUID(),
                        amount: -toSmallestUnit(amount),
                        referenceAmount: toSmallestUnit(amount * exchangeRate),
                        category: '',
                        capitalized: false,
                        hide: false,
                        labels: [],
                        comment: '',
                    })

                    setSubExpenses((prevSubExpenses) => {
                        return [...prevSubExpenses, newSubExpense]
                    })
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
            updateExpenseField,
            updateSubExpenseField,
            getExpenseById,
            getSubExpenseById,
            updateExpense,
            updateSubExpense,
            deleteExpense,
            deleteSubExpense,
            addSubExpense,
            setError,
        ]
    )

    return { loading, error, expenses, subExpenses, handlers }
}
