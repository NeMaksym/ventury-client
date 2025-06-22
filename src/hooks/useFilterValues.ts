import { useState, useCallback, useMemo } from 'react'

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

export const useFilterValues = () => {
    const [values, setValues] = useState<Filters>({
        startDate: startOfMonth(),
        endDate: today(),
        banks: [],
        categories: [],
        labels: [],
    })

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
