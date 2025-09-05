import {
    ExpenseCategoryService,
    ExpenseService,
    IncomeService,
    SubExpenseService,
} from '../db/services'
import { ExpenseFilterStore } from './expenseFilterStore'
import { ExpenseCategoryStore } from './expenseCategoryStore'
import { ExpenseStore } from './expenseStore'
import { IncomeStore } from './incomeStore'
import { UiStore } from './uiStore'

export class RootStore {
    uiStore: UiStore
    expenseFilterStore: ExpenseFilterStore
    expenseCategoryStore: ExpenseCategoryStore
    expenseStore: ExpenseStore
    incomeStore: IncomeStore

    constructor() {
        this.uiStore = new UiStore()

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

        const incomeService = new IncomeService()
        this.incomeStore = new IncomeStore(this, incomeService)
    }
}
