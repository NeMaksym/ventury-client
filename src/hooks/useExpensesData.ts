import { useEffect, useState } from 'react'
import { useExpenseService, useSubExpenseService } from '../db'
import { SystemTransaction, SystemSubTransaction } from '../types'
import { useStore } from '../context/StoreContext'

export const useExpensesData = () => {
    const { expenseFilterStore } = useStore()

    const { getExpensesByDateRange } = useExpenseService()
    const { getSubExpensesByDateRange } = useSubExpenseService()

    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [expenses, setExpenses] = useState<SystemTransaction[]>([])
    const [subExpenses, setSubExpenses] = useState<SystemSubTransaction[]>([])

    useEffect(() => {
        setLoading(true)
        setError(null)

        async function fetchExpenses() {
            const start = new Date(expenseFilterStore.startDate + 'T00:00:00')
            const end = new Date(expenseFilterStore.endDate + 'T23:59:59')

            const [expenses, subExpenses] = await Promise.all([
                getExpensesByDateRange(start, end),
                getSubExpensesByDateRange(start, end),
            ])

            setExpenses(expenses)
            setSubExpenses(subExpenses)
        }

        fetchExpenses()
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [
        getExpensesByDateRange,
        getSubExpensesByDateRange,
        expenseFilterStore.startDate,
        expenseFilterStore.endDate,
    ])

    return {
        loading,
        error,
        expenses,
        subExpenses,
        setExpenses,
        setSubExpenses,
    }
}
