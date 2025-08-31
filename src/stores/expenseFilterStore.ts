import { makeAutoObservable, reaction } from 'mobx'

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

export class ExpenseFilterStore {
    startDate = ''
    endDate = ''
    banks: string[] = []
    categories: string[] = []
    labels: string[] = []

    constructor() {
        makeAutoObservable(this)
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
