import { ExpenseFilterStore } from './expenseFilterStore'
import { ExpenseCategoryStore } from './expenseCategoryStore'
import { ExpenseCategoryService } from '../db/expenseCategoryService'

export class RootStore {
    expenseFilterStore: ExpenseFilterStore
    expenseCategoryStore: ExpenseCategoryStore

    constructor() {
        this.expenseFilterStore = new ExpenseFilterStore()

        const categoryService = new ExpenseCategoryService()
        this.expenseCategoryStore = new ExpenseCategoryStore(categoryService)
    }
}
