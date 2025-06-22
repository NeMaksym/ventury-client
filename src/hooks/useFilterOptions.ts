import { useMemo } from 'react'

export interface Bank {
    value: string
    label: string
}

export interface Category {
    value: string
    label: string
}

export const useFilterOptions = () => {
    const options = useMemo(
        () => ({
            banks: [
                { value: 'monobank', label: 'Monobank' },
                { value: 'privatbank', label: 'PrivatBank' },
                { value: 'oschadbank', label: 'Oschadbank' },
                { value: 'raiffeisen', label: 'Raiffeisen' },
            ] as Bank[],
            categories: [
                { value: 'food', label: 'Food' },
                { value: 'transport', label: 'Transport' },
                { value: 'entertainment', label: 'Entertainment' },
                { value: 'shopping', label: 'Shopping' },
            ] as Category[],
            labels: [
                'Work',
                'Personal',
                'Travel',
                'Emergency',
                'Recurring',
                'One-time',
            ] as string[],
        }),
        []
    )

    return options
}
