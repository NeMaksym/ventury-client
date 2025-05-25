import { useCallback } from 'react'

import { useDb } from '../context/DbContext'
import { Transaction } from '../types/transaction'
import { Stores } from '../db/connect'

export function useAddExpense() {
    const { getDb } = useDb()

    const addExpense = useCallback(
        async (expense: Transaction) => {
            const db = await getDb()
            await db.add(Stores.EXPENSES, expense)
        },
        [getDb]
    )

    return { addExpense }
}
