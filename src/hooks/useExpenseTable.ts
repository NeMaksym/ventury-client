import { useMemo } from 'react'

import { SystemSubTransaction, SystemTransaction } from '../types'
import { TransactionRow } from '../components/TransactionsTable'
import { fromSmallestUnit } from '../utils'
import { useStore } from '../context/StoreContext'
import { ExpenseFilterStore } from '../stores/expenseFilterStore'

type ExpenseTableResult = {
    rows: TransactionRow[]
    totalAmount: number
    totalRefAmount: number
}

type SubExpensesMap = Map<string, SystemSubTransaction[]>

export const useExpenseTable = (
    expenses: SystemTransaction[],
    subExpenses: SystemSubTransaction[]
): ExpenseTableResult => {
    const { expenseFilterStore } = useStore()

    const rows = useMemo<TransactionRow[]>(() => {
        const subExpensesMap = subExpenses
            .slice()
            .sort(timeDesc)
            .reduce<SubExpensesMap>((acc, subExpense) => {
                const subExpenses = acc.get(subExpense.parentId) || []
                subExpenses.push(subExpense)
                acc.set(subExpense.parentId, subExpenses)
                return acc
            }, new Map())

        const result: TransactionRow[] = []

        expenses
            .slice()
            .sort(timeDesc)
            .forEach((expense) => {
                const subExpenses = subExpensesMap.get(expense.id) || []

                if (shouldShowTransaction(expense, expenseFilterStore)) {
                    result.push(expenseToTableRow(expense, subExpenses))
                }

                for (const subExpense of subExpenses) {
                    if (
                        shouldShowSubTransaction(
                            expense,
                            subExpense,
                            expenseFilterStore
                        )
                    ) {
                        result.push(subExpenseToTableRow(subExpense))
                    }
                }
            })

        return result
    }, [
        expenses,
        subExpenses,
        expenseFilterStore.banks,
        expenseFilterStore.categories,
        expenseFilterStore.labels,
    ])

    const { totalAmount, totalRefAmount } = useMemo(() => {
        return rows.reduce(
            (acc, row) => {
                acc.totalAmount += row.amount
                acc.totalRefAmount += row.referenceAmount
                return acc
            },
            { totalAmount: 0, totalRefAmount: 0 }
        )
    }, [rows])

    return {
        rows,
        totalAmount: fromSmallestUnit(totalAmount),
        totalRefAmount: fromSmallestUnit(totalRefAmount),
    }
}

function timeDesc(
    a: SystemTransaction | SystemSubTransaction,
    b: SystemTransaction | SystemSubTransaction
) {
    return b.time - a.time
}

function expenseToTableRow(
    expense: SystemTransaction,
    subExpenses: SystemSubTransaction[]
): SystemTransaction {
    const subExpensesSum = subExpenses.reduce(
        (sum, subExpense) => sum + subExpense.amount,
        0
    )
    const subExpensesRefSum = subExpenses.reduce(
        (sum, sub) => sum + sub.referenceAmount,
        0
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

function shouldShowTransaction(
    transaction: SystemTransaction,
    filters: ExpenseFilterStore
) {
    if (filters.banks.length > 0 && !filters.banks.includes(transaction.bank)) {
        return false
    }

    if (filters.categories.length > 0) {
        if (
            !transaction.category ||
            !filters.categories.includes(transaction.category)
        ) {
            return false
        }
    }

    if (filters.labels.length > 0) {
        if (
            !transaction.labels.some((label) => filters.labels.includes(label))
        ) {
            return false
        }
    }

    return true
}

function shouldShowSubTransaction(
    transaction: SystemTransaction,
    subTransaction: SystemSubTransaction,
    filters: ExpenseFilterStore
) {
    if (filters.banks.length > 0 && !filters.banks.includes(transaction.bank)) {
        return false
    }

    if (filters.categories.length > 0) {
        if (
            !subTransaction.category ||
            !filters.categories.includes(subTransaction.category)
        ) {
            return false
        }
    }

    if (filters.labels.length > 0) {
        if (
            !subTransaction.labels.some((label) =>
                filters.labels.includes(label)
            )
        ) {
            return false
        }
    }

    return true
}
