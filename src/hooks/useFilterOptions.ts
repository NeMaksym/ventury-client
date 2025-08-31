import { useMemo } from 'react'
import { Category, SystemSubTransaction, SystemTransaction } from '../types'
import { useStore } from '../context/StoreContext'

export interface Bank {
    value: string
    label: string
}

export const useFilterOptions = (
    transactions: SystemTransaction[],
    subTransactions: SystemSubTransaction[]
) => {
    const { expenseCategoryStore } = useStore()

    return useMemo(() => {
        const uniqueBanks = new Set<string>()
        const uniqueLabels = new Set<string>()
        const uniqueCategories = new Set<string>()

        const allTransactions = [...transactions, ...subTransactions]

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
                    expenseCategoryStore.categories.find(
                        (c) => c.id === categoryId
                    )?.label || '',
            })
        )

        return {
            banks,
            categories,
            labels: Array.from(uniqueLabels).sort(),
        }
    }, [transactions, subTransactions, expenseCategoryStore.categories])
}
