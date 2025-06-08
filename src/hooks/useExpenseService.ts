import { useCallback } from 'react'

import { useDb } from '../context/DbContext'
import { SystemTransaction } from '../types'
import { Stores } from '../db/connect'

export interface ExpenseService {
    transactionExists: (transaction: SystemTransaction) => Promise<boolean>
}

export function useExpenseService(): ExpenseService {
    const { getDb } = useDb()

    const transactionExists = useCallback(
        async (transaction: SystemTransaction): Promise<boolean> => {
            const db = await getDb()
            const tx = db.transaction(Stores.EXPENSES, 'readonly')
            const store = tx.objectStore(Stores.EXPENSES)
            const timeIndex = store.index('time')

            try {
                const transactionsAtSameTime = await timeIndex.getAll(
                    transaction.time
                )

                return transactionsAtSameTime.some(
                    (dbTransaction) =>
                        dbTransaction.bank === transaction.bank &&
                        dbTransaction.amount === transaction.amount
                )
            } catch (error) {
                console.error('Failed to check if transaction exists:', error)
                throw error
            }
        },
        [getDb]
    )

    return { transactionExists }
}
