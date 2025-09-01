import { makeAutoObservable, reaction } from 'mobx'
import { SystemTransaction, SystemSubTransaction } from '../types'
import { ExpenseService } from '../db/expenseService'
import { SubExpenseService } from '../db/subExpenseService'
import { RootStore } from './rootStore'
import { toSmallestUnit } from '../utils/formatAmount'

export class ExpenseStore {
    private readonly root: RootStore
    private readonly expenseService: ExpenseService
    private readonly subExpenseService: SubExpenseService

    loading = false
    error: string | null = null
    expenses: SystemTransaction[] = []
    subExpenses: SystemSubTransaction[] = []

    async expenseExists(expense: SystemTransaction): Promise<boolean> {
        this.error = null

        try {
            return await this.expenseService.expenseExists(expense)
        } catch (e) {
            this.error =
                e instanceof Error
                    ? e.message
                    : 'Failed to check if expense exists'
            throw new Error(this.error)
        }
    }

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
        this.error = null

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
        this.error = null

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
        this.error = null

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
        this.error = null

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

    *resetCategory(categoryId: string) {
        this.error = null

        try {
            yield this.expenseService.resetCategory(categoryId)
            yield this.subExpenseService.resetCategory(categoryId)

            this.expenses = this.expenses.map((e) =>
                e.category === categoryId ? { ...e, category: '' } : e
            )
            this.subExpenses = this.subExpenses.map((s) =>
                s.category === categoryId ? { ...s, category: '' } : s
            )
        } catch (e) {
            this.error =
                e instanceof Error ? e.message : 'Failed to reset category'
        }
    }

    *addExpense(expense: SystemTransaction) {
        this.error = null

        try {
            expense = yield this.expenseService.addExpense(expense)
            this.expenses.push(expense)
        } catch (e) {
            this.error =
                e instanceof Error ? e.message : 'Failed to add expense'
            throw new Error(this.error)
        }
    }
}
