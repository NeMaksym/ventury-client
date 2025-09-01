import { makeAutoObservable } from 'mobx'

import { RootStore } from './rootStore'
import { SystemTransaction, SystemSubTransaction } from '../types'
import { timeDesc, fromSmallestUnit } from '../utils'

export class ExpenseListStore {
    root: RootStore

    constructor(root: RootStore) {
        makeAutoObservable(this)
        this.root = root
    }

    private expenseToTableRow(
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

    private subExpenseToTableRow(
        subExpense: SystemSubTransaction
    ): SystemSubTransaction {
        return {
            ...subExpense,
            amount: -subExpense.amount,
        }
    }

    private shouldShowTransaction(
        transaction: SystemTransaction,
        filters: RootStore['expenseFilterStore']
    ) {
        if (
            filters.banks.length > 0 &&
            !filters.banks.includes(transaction.bank)
        ) {
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
                !transaction.labels.some((label) =>
                    filters.labels.includes(label)
                )
            ) {
                return false
            }
        }

        return true
    }

    private shouldShowSubTransaction(
        transaction: SystemTransaction,
        subTransaction: SystemSubTransaction,
        filters: RootStore['expenseFilterStore']
    ) {
        if (
            filters.banks.length > 0 &&
            !filters.banks.includes(transaction.bank)
        ) {
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

    get rows() {
        const result: (SystemTransaction | SystemSubTransaction)[] = []

        this.root.expenseStore.expenses
            .slice()
            .sort(timeDesc)
            .forEach((expense) => {
                const subExpenses =
                    this.root.expenseStore.subExpensesMap.get(expense.id) || []

                if (
                    this.shouldShowTransaction(
                        expense,
                        this.root.expenseFilterStore
                    )
                ) {
                    result.push(this.expenseToTableRow(expense, subExpenses))
                }

                for (const subExpense of subExpenses) {
                    if (
                        this.shouldShowSubTransaction(
                            expense,
                            subExpense,
                            this.root.expenseFilterStore
                        )
                    ) {
                        result.push(this.subExpenseToTableRow(subExpense))
                    }
                }
            })

        return result
    }

    // TODO: Count total by currency
    get amounts() {
        const amounts = this.rows.reduce(
            (acc, row) => {
                acc.totalAmount += row.amount
                acc.totalRefAmount += row.referenceAmount
                return acc
            },
            { totalAmount: 0, totalRefAmount: 0 }
        )

        return {
            totalAmount: fromSmallestUnit(amounts.totalAmount),
            totalRefAmount: fromSmallestUnit(amounts.totalRefAmount),
        }
    }
}
