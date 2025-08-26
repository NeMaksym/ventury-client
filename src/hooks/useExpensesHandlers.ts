import { useState, useMemo } from 'react'
import { useExpenseService, useSubExpenseService } from '../db'
import { SystemTransaction, SystemSubTransaction } from '../types'
import { toSmallestUnit } from '../utils/formatAmount'

export const useExpensesHandlers = (
    setExpenses: React.Dispatch<React.SetStateAction<SystemTransaction[]>>,
    setSubExpenses: React.Dispatch<React.SetStateAction<SystemSubTransaction[]>>
) => {
    const [error, setError] = useState<string | null>(null)

    const { getExpenseById, updateExpense, deleteExpense } = useExpenseService()

    const {
        getSubExpenseById,
        updateSubExpense,
        deleteSubExpense,
        addSubExpense,
    } = useSubExpenseService()

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
                        expense.referenceAmount / -expense.amount

                    const newSubExpense = await addSubExpense({
                        // inherited
                        parentId: expenseId,
                        account: expense.account,
                        bank: expense.bank,
                        time: expense.time,
                        description: expense.description,
                        currencyCode: expense.currencyCode,
                        referenceCurrencyCode: expense.referenceCurrencyCode,
                        category: expense.category,
                        labels: expense.labels,
                        // own
                        id: crypto.randomUUID(),
                        amount: -toSmallestUnit(amount),
                        referenceAmount: toSmallestUnit(amount * exchangeRate),
                        capitalized: false,
                        hide: false,
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

    return { error, handlers }
}
