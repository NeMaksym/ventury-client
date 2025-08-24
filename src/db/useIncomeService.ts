import { useCallback } from 'react'

import { useDb } from '../context/DbContext'
import { SystemTransaction } from '../types'
import { Stores } from '../db/connect'

export interface IncomeService {
    transactionExists: (transaction: SystemTransaction) => Promise<boolean>
    addIncome: (income: SystemTransaction) => Promise<SystemTransaction>
}

export function useIncomeService(): IncomeService {
    const { getDb } = useDb()

    const transactionExists = useCallback(
        async (transaction: SystemTransaction): Promise<boolean> => {
            const db = await getDb()
            const tx = db.transaction(Stores.INCOMES, 'readonly')
            const store = tx.objectStore(Stores.INCOMES)
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

    const addIncome = useCallback(
        async (income: SystemTransaction): Promise<SystemTransaction> => {
            if (income.amount <= 0) {
                throw new Error('Income amount must be positive')
            }

            if (income.referenceAmount <= 0) {
                throw new Error('Income referenceAmount must be positive')
            }

            if (income.operationAmount <= 0) {
                throw new Error('Income operationAmount must be positive')
            }

            const db = await getDb()
            const tx = db.transaction(Stores.INCOMES, 'readwrite')
            const store = tx.objectStore(Stores.INCOMES)

            try {
                await store.add(income)
                return income
            } catch (error) {
                console.error('Failed to add income:', error)
                throw error
            }
        },
        [getDb]
    )

    return { transactionExists, addIncome }
}
