import { useCallback } from 'react'

import { useDb } from '../context/DbContext'
import { SystemTransaction } from '../types'
import { Stores } from '../db/connect'

export interface TransactionService {
    addTransactions: (transactions: SystemTransaction[]) => Promise<void>
}

export function useTransactionService(): TransactionService {
    const { getDb } = useDb()

    const addTransactions = useCallback(
        async (transactions: SystemTransaction[]) => {
            const db = await getDb()
            const tx = db.transaction(
                [Stores.EXPENSES, Stores.INCOMES],
                'readwrite'
            )

            const expensesStore = tx.objectStore(Stores.EXPENSES)
            const incomesStore = tx.objectStore(Stores.INCOMES)

            try {
                const promises = transactions.map((transaction) => {
                    if (transaction.amount < 0n) {
                        return expensesStore.add(transaction)
                    } else {
                        return incomesStore.add(transaction)
                    }
                })

                await Promise.all(promises)
                await tx.done
            } catch (error) {
                console.error('Failed to add transactions:', error)
                throw error
            }
        },
        [getDb]
    )

    return { addTransactions }
}
