import { makeAutoObservable, reaction } from 'mobx'
import { RootStore } from './rootStore'
import { Category } from '../types'

export const STORAGE_KEYS = {
    START_DATE: 'filter-start-date',
    END_DATE: 'filter-end-date',
} as const

const today = (): string => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const startOfMonth = (): string => {
    const now = new Date()
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
    const year = start.getFullYear()
    const month = String(start.getMonth() + 1).padStart(2, '0')
    const day = String(start.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const getInitialStartDate = (): string => {
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.START_DATE)
        return saved || startOfMonth()
    } catch (error) {
        return startOfMonth()
    }
}

const getInitialEndDate = (): string => {
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.END_DATE)
        return saved || today()
    } catch (error) {
        return today()
    }
}

interface Bank {
    value: string
    label: string
}

export class ExpenseFilterStore {
    root: RootStore

    startDate = ''
    endDate = ''
    banks: string[] = []
    categories: string[] = []
    labels: string[] = []

    constructor(root: RootStore) {
        makeAutoObservable(this)
        this.root = root
        this.startDate = getInitialStartDate()
        this.endDate = getInitialEndDate()

        reaction(
            () => this.startDate,
            (start) => {
                try {
                    localStorage.setItem(STORAGE_KEYS.START_DATE, start)
                } catch (error) {
                    console.error(
                        'Failed to save start date to localStorage:',
                        error
                    )
                }
            }
        )

        reaction(
            () => this.endDate,
            (end) => {
                try {
                    localStorage.setItem(STORAGE_KEYS.END_DATE, end)
                } catch (error) {
                    console.error(
                        'Failed to save end date to localStorage:',
                        error
                    )
                }
            }
        )
    }

    get unixStartDate() {
        return new Date(this.startDate + 'T00:00:00').getTime()
    }

    get unixEndDate() {
        return new Date(this.endDate + 'T23:59:59').getTime()
    }

    get options() {
        const uniqueBanks = new Set<string>()
        const uniqueLabels = new Set<string>()
        const uniqueCategories = new Set<string>()

        const allTransactions = [
            ...this.root.expenseStore.expenses,
            ...this.root.expenseStore.subExpenses,
        ]

        allTransactions.forEach((transaction) => {
            uniqueBanks.add(transaction.bank)

            if (transaction.category && transaction.category.trim()) {
                uniqueCategories.add(transaction.category)
            }

            transaction.labels.forEach((label) => {
                if (label.trim()) {
                    uniqueLabels.add(label)
                }
            })
        })

        const banks: Bank[] = Array.from(uniqueBanks).map((bankValue) => ({
            value: bankValue,
            label: bankValue.charAt(0).toUpperCase() + bankValue.slice(1),
        }))

        const categories: Category[] = Array.from(uniqueCategories).map(
            (categoryId) => ({
                id: categoryId,
                label:
                    this.root.expenseCategoryStore.categories.find(
                        (c) => c.id === categoryId
                    )?.label || '',
            })
        )

        return {
            banks,
            categories,
            labels: Array.from(uniqueLabels).sort(),
        }
    }

    updateStartDate(startDate: string) {
        this.startDate = startDate
    }

    updateEndDate(endDate: string) {
        this.endDate = endDate
    }

    updateBanks(banks: string[]) {
        this.banks = banks
    }

    updateCategories(categories: string[]) {
        this.categories = categories
    }

    updateLabels(labels: string[]) {
        this.labels = labels
    }
}
