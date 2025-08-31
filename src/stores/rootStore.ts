import { ExpenseFilterStore } from './expenseFilterStore'

export class RootStore {
    expenseFilterStore: ExpenseFilterStore

    constructor() {
        this.expenseFilterStore = new ExpenseFilterStore()
    }
}
