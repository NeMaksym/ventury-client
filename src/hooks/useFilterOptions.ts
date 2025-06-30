import { useMemo } from 'react'
import { Category } from '../types'

export interface Bank {
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
                { id: 'food', label: 'Food' },
                { id: 'transport', label: 'Transport' },
                { id: 'entertainment', label: 'Entertainment' },
                { id: 'shopping', label: 'Shopping' },
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
