import {
    ExpenseCategoryService,
    ExpenseService,
    SubExpenseService,
} from '../db/services'
import { ExpenseFilterStore } from './expenseFilterStore'
import { ExpenseCategoryStore } from './expenseCategoryStore'
import { ExpenseStore } from './expenseStore'

export class RootStore {
    expenseFilterStore: ExpenseFilterStore
    expenseCategoryStore: ExpenseCategoryStore
    expenseStore: ExpenseStore

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
    }
}
