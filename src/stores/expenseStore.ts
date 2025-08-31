import { makeAutoObservable, reaction } from 'mobx'
import { SystemTransaction, SystemSubTransaction } from '../types'
import { ExpenseService } from '../db/expenseService'
import { SubExpenseService } from '../db/subExpenseService'
import { RootStore } from './rootStore'
import { toSmallestUnit } from '../utils/formatAmount'

export class ExpenseStore {
    root: RootStore
    expenseService: ExpenseService
    subExpenseService: SubExpenseService

    loading = false
    error: string | null = null
    expenses: SystemTransaction[] = []
    subExpenses: SystemSubTransaction[] = []

    constructor(
        root: RootStore,
        expenseService: ExpenseService,
        subExpenseService: SubExpenseService
    ) {
        makeAutoObservable(this)
        this.root = root
        this.expenseService = expenseService
        this.subExpenseService = subExpenseService

        reaction(
            () => [
                this.root.expenseFilterStore.startDate,
                this.root.expenseFilterStore.endDate,
            ],
            () => {
                this.loadByDateRange()
            },
            { fireImmediately: true }
        )
    }

    *loadByDateRange() {
        this.loading = true
        this.error = null

        try {
            const start = new Date(
                this.root.expenseFilterStore.startDate + 'T00:00:00'
            )
            const end = new Date(
                this.root.expenseFilterStore.endDate + 'T23:59:59'
            )
            const [expenses, subExpenses]: [
                SystemTransaction[],
                SystemSubTransaction[]
            ] = yield Promise.all([
                this.expenseService.getExpensesByDateRange(start, end),
                this.subExpenseService.getSubExpensesByDateRange(start, end),
            ])
            this.expenses = expenses
            this.subExpenses = subExpenses
        } catch (e) {
            this.error =
                e instanceof Error ? e.message : 'Failed to load expenses'
        } finally {
            this.loading = false
        }
    }

    *updateExpenseField(
        expenseId: string,
        updates: Partial<SystemTransaction>,
        errorMessage: string
    ) {
        try {
            const expense: SystemTransaction | undefined =
                yield this.expenseService.getExpenseById(expenseId)
            if (!expense) return

            const updated: SystemTransaction =
                yield this.expenseService.updateExpense({
                    ...expense,
                    ...updates,
                })
            this.expenses = this.expenses.map((e) =>
                e.id === expenseId ? updated : e
            )
        } catch (e) {
            this.error = e instanceof Error ? e.message : errorMessage
        }
    }

    *updateSubExpenseField(
        subExpenseId: string,
        updates: Partial<SystemSubTransaction>,
        errorMessage: string
    ) {
        try {
            const sub: SystemSubTransaction | undefined =
                yield this.subExpenseService.getSubExpenseById(subExpenseId)
            if (!sub) return

            const updated: SystemSubTransaction =
                yield this.subExpenseService.updateSubExpense({
                    ...sub,
                    ...updates,
                })
            this.subExpenses = this.subExpenses.map((s) =>
                s.id === subExpenseId ? updated : s
            )
        } catch (e) {
            this.error = e instanceof Error ? e.message : errorMessage
        }
    }

    *delete(expenseId: string, subExpenseId?: string) {
        try {
            if (subExpenseId) {
                yield this.subExpenseService.deleteSubExpense(subExpenseId)
                this.subExpenses = this.subExpenses.filter(
                    (s) => s.id !== subExpenseId
                )
            } else {
                yield this.expenseService.deleteExpense(expenseId)
                this.expenses = this.expenses.filter((e) => e.id !== expenseId)
            }
        } catch (e) {
            this.error =
                e instanceof Error ? e.message : 'Failed to delete expense'
        }
    }

    *createSubTransaction(expenseId: string, amount: number) {
        try {
            const expense: SystemTransaction | undefined =
                yield this.expenseService.getExpenseById(expenseId)
            if (!expense) {
                this.error = 'Expense not found'
                return
            }
            const exchangeRate = expense.referenceAmount / -expense.amount
            const subExpense: SystemSubTransaction =
                yield this.subExpenseService.addSubExpense({
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
            this.subExpenses = [...this.subExpenses, subExpense]
        } catch (e) {
            this.error =
                e instanceof Error
                    ? e.message
                    : 'Failed to create sub-transaction'
        }
    }
}
