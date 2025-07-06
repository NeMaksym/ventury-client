import { useEffect, useState } from 'react'
import { useExpenseService, useSubExpenseService } from '../db'
import { Filters } from './useFilterValues'
import { SystemTransaction, SystemSubTransaction } from '../types'

export const useExpensesData = (
    startDate: Filters['startDate'],
    endDate: Filters['endDate']
) => {
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
            const start = new Date(startDate + 'T00:00:00')
            const end = new Date(endDate + 'T23:59:59')

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
    }, [getExpensesByDateRange, getSubExpensesByDateRange, startDate, endDate])

    return {
        loading,
        error,
        expenses,
        subExpenses,
        setExpenses,
        setSubExpenses,
    }
}
