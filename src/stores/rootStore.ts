import { ExpenseFilterStore } from './expenseFilterStore'
import { ExpenseCategoryStore } from './expenseCategoryStore'
import { ExpenseListStore } from './expenseListStore'
import { ExpenseCategoryService } from '../db/expenseCategoryService'
import { ExpenseStore } from './expenseStore'
import { ExpenseService } from '../db/expenseService'
import { SubExpenseService } from '../db/subExpenseService'

export class RootStore {
    expenseFilterStore: ExpenseFilterStore
    expenseCategoryStore: ExpenseCategoryStore
    expenseStore: ExpenseStore
    expenseListStore: ExpenseListStore

    constructor() {
        this.expenseFilterStore = new ExpenseFilterStore(this)

        const categoryService = new ExpenseCategoryService()
        this.expenseCategoryStore = new ExpenseCategoryStore(categoryService)

        const expenseService = new ExpenseService()
        const subExpenseService = new SubExpenseService()
        this.expenseStore = new ExpenseStore(
            this,
            expenseService,
            subExpenseService
        )

        this.expenseListStore = new ExpenseListStore(this)
    }
}
