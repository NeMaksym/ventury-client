import { useEffect, useState, useMemo } from 'react'
import { useExpenseService } from './useExpenseService'
import { useSubExpenseService } from './useSubExpenseService'
import {
    Filters,
    shouldShowTransaction,
    shouldShowSubTransaction,
} from './useFilterValues'
import { SystemTransaction, SystemSubTransaction } from '../types'
import { TransactionRow } from '../components/TransactionsTable/types'
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
    const [subExpensesMap, setSubExpensesMap] = useState<
        Map<string, SystemSubTransaction[]>
    >(new Map())

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

            setExpenses(
                expenses.sort((a, b) => b.time.getTime() - a.time.getTime())
            )

            setSubExpensesMap(
                subExpenses.reduce((acc, subExpense) => {
                    const subExpenses = acc.get(subExpense.parentId) || []
                    subExpenses.push(subExpense)
                    acc.set(subExpense.parentId, subExpenses)
                    return acc
                }, new Map<string, SystemSubTransaction[]>())
            )
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

    const rows = useMemo<TransactionRow[]>(() => {
        const result = []

        for (const expense of expenses) {
            const subExpenses = subExpensesMap.get(expense.id) || []

            if (shouldShowTransaction(expense, filters)) {
                result.push(expenseToTableRow(expense, subExpenses))
            }

            for (const subExpense of subExpenses) {
                if (shouldShowSubTransaction(expense, subExpense, filters)) {
                    result.push(subExpenseToTableRow(subExpense))
                }
            }
        }

        return result
    }, [
        expenses,
        subExpensesMap,
        filters.banks,
        filters.categories,
        filters.labels,
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

            setSubExpensesMap((prevSubExpensesMap) => {
                const subExpenses =
                    prevSubExpensesMap.get(subExpense.parentId) || []
                const updatedSubExpenses = subExpenses.map((subExpense) =>
                    subExpense.id === subExpenseId
                        ? updatedSubExpense
                        : subExpense
                )
                const newSubExpensesMap = new Map(prevSubExpensesMap)
                newSubExpensesMap.set(subExpense.parentId, updatedSubExpenses)
                return newSubExpensesMap
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
                        setSubExpensesMap((prevSubExpensesMap) => {
                            const subExpenses =
                                prevSubExpensesMap.get(expenseId) || []
                            return new Map(prevSubExpensesMap).set(
                                expenseId,
                                subExpenses.filter(
                                    (subExpense) =>
                                        subExpense.id !== subExpenseId
                                )
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

                    setSubExpensesMap((prevSubExpensesMap) => {
                        const subExpenses =
                            prevSubExpensesMap.get(newSubExpense.parentId) || []
                        return new Map(prevSubExpensesMap).set(
                            newSubExpense.parentId,
                            [...subExpenses, newSubExpense]
                        )
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

    return { loading, error, rows, handlers }
}

function expenseToTableRow(
    expense: SystemTransaction,
    subExpenses: SystemSubTransaction[]
): SystemTransaction {
    const subExpensesSum = subExpenses.reduce(
        (sum, subExpense) => sum + subExpense.amount,
        0n
    )
    const subExpensesRefSum = subExpenses.reduce(
        (sum, sub) => sum + sub.referenceAmount,
        0n
    )
    const expenseAmount = expense.amount - subExpensesSum
    const expenseRefAmount = expense.referenceAmount - subExpensesRefSum

    return {
        ...expense,
        amount: -expenseAmount,
        referenceAmount: expenseRefAmount,
    }
}

function subExpenseToTableRow(
    subExpense: SystemSubTransaction
): SystemSubTransaction {
    return {
        ...subExpense,
        amount: -subExpense.amount,
    }
}
