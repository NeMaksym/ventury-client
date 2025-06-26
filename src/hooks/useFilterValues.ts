import { useState, useMemo, useEffect } from 'react'
import { SystemSubTransaction, SystemTransaction } from '../types'

const STORAGE_KEYS = {
    START_DATE: 'filter-start-date',
    END_DATE: 'filter-end-date',
} as const

export interface Filters {
    startDate: string
    endDate: string
    banks: string[]
    categories: string[]
    labels: string[]
}

const today = (): string => {
    const now = new Date()

    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

const startOfMonth = (): string => {
    const today = new Date()
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

    const year = startOfMonth.getFullYear()
    const month = String(startOfMonth.getMonth() + 1).padStart(2, '0')
    const day = String(startOfMonth.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

const getInitialStartDate = (): string => {
    try {
        const savedStartDate = localStorage.getItem(STORAGE_KEYS.START_DATE)
        return savedStartDate || startOfMonth()
    } catch (error) {
        return startOfMonth()
    }
}

const getInitialEndDate = (): string => {
    try {
        const savedEndDate = localStorage.getItem(STORAGE_KEYS.END_DATE)
        return savedEndDate || today()
    } catch (error) {
        return today()
    }
}

export const useFilterValues = () => {
    const [values, setValues] = useState<Filters>(() => {
        return {
            startDate: getInitialStartDate(),
            endDate: getInitialEndDate(),
            banks: [],
            categories: [],
            labels: [],
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.START_DATE, values.startDate)
        } catch (error) {
            console.error('Failed to save start date to localStorage:', error)
        }
    }, [values.startDate])

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.END_DATE, values.endDate)
        } catch (error) {
            console.error('Failed to save end date to localStorage:', error)
        }
    }, [values.endDate])

    const handlers = useMemo(
        () => ({
            onStartDateChange: (startDate: string) => {
                setValues((prev) => ({ ...prev, startDate }))
            },
            onEndDateChange: (endDate: string) => {
                setValues((prev) => ({ ...prev, endDate }))
            },
            onBanksChange: (banks: string[]) => {
                setValues((prev) => ({ ...prev, banks }))
            },
            onCategoriesChange: (categories: string[]) => {
                setValues((prev) => ({ ...prev, categories }))
            },
            onLabelsChange: (labels: string[]) => {
                setValues((prev) => ({ ...prev, labels }))
            },
        }),
        [setValues]
    )

    return {
        values,
        handlers,
    }
}

export function shouldShowTransaction(
    transaction: SystemTransaction,
    filters: Filters
) {
    if (filters.banks.length > 0 && !filters.banks.includes(transaction.bank)) {
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
            !transaction.labels.some((label) => filters.labels.includes(label))
        ) {
            return false
        }
    }

    return true
}

export function shouldShowSubTransaction(
    transaction: SystemTransaction,
    subTransaction: SystemSubTransaction,
    filters: Filters
) {
    if (filters.banks.length > 0 && !filters.banks.includes(transaction.bank)) {
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
