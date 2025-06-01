import { useCallback } from 'react'

import { useDb } from '../context/DbContext'
import { SystemTransaction } from '../types'
import { Stores } from '../db/connect'

export function useAddExpense() {
    const { getDb } = useDb()

    const addExpense = useCallback(
        async (expense: SystemTransaction) => {
            const db = await getDb()
            await db.add(Stores.EXPENSES, expense)
        },
        [getDb]
    )

    return { addExpense }
}
