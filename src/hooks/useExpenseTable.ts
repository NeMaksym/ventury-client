import { useMemo } from 'react'

import { SystemSubTransaction, SystemTransaction } from '../types'
import { TransactionRow } from '../components/TransactionsTable'
import {
    Filters,
    shouldShowSubTransaction,
    shouldShowTransaction,
} from './useFilterValues'

export const useExpenseTable = (
    expenses: SystemTransaction[],
    subExpenses: SystemSubTransaction[],
    filters: Filters
): TransactionRow[] => {
    const rows = useMemo<TransactionRow[]>(() => {
        const subExpensesMap = subExpenses
            .sort(timeDesc)
            .reduce((acc, subExpense) => {
                const subExpenses = acc.get(subExpense.parentId) || []
                subExpenses.push(subExpense)
                acc.set(subExpense.parentId, subExpenses)
                return acc
            }, new Map<string, SystemSubTransaction[]>())

        const result: TransactionRow[] = []

        expenses.sort(timeDesc).forEach((expense) => {
            const subExpenses = subExpensesMap.get(expense.id) || []

            if (shouldShowTransaction(expense, filters)) {
                result.push(expenseToTableRow(expense, subExpenses))
            }

            for (const subExpense of subExpenses) {
                if (shouldShowSubTransaction(expense, subExpense, filters)) {
                    result.push(subExpenseToTableRow(subExpense))
                }
            }
        })

        return result
    }, [
        expenses,
        subExpenses,
        filters.banks,
        filters.categories,
        filters.labels,
    ])

    return rows
}

function timeDesc(
    a: SystemTransaction | SystemSubTransaction,
    b: SystemTransaction | SystemSubTransaction
) {
    return b.time.getTime() - a.time.getTime()
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
