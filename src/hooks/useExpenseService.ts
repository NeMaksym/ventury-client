import { useCallback } from 'react'

import { useDb } from '../context/DbContext'
import { SystemTransaction } from '../types'
import { Stores } from '../db/connect'

export interface ExpenseService {
    transactionExists: (transaction: SystemTransaction) => Promise<boolean>
    getAllTransactions: () => Promise<SystemTransaction[]>
    getTransactionById: (id: string) => Promise<SystemTransaction | undefined>
    updateTransaction: (
        transaction: SystemTransaction
    ) => Promise<SystemTransaction>
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

    const getAllTransactions = useCallback(async (): Promise<
        SystemTransaction[]
    > => {
        const db = await getDb()
        const tx = db.transaction(Stores.EXPENSES, 'readonly')
        const store = tx.objectStore(Stores.EXPENSES)

        try {
            return await store.getAll()
        } catch (error) {
            console.error('Failed to get all transactions:', error)
            throw error
        }
    }, [getDb])

    const getTransactionById = useCallback(
        async (id: string): Promise<SystemTransaction | undefined> => {
            const db = await getDb()
            const tx = db.transaction(Stores.EXPENSES, 'readonly')
            const store = tx.objectStore(Stores.EXPENSES)

            try {
                return await store.get(id)
            } catch (error) {
                console.error('Failed to get transaction by id:', error)
                throw error
            }
        },
        [getDb]
    )

    const updateTransaction = useCallback(
        async (transaction: SystemTransaction): Promise<SystemTransaction> => {
            const db = await getDb()
            const tx = db.transaction(Stores.EXPENSES, 'readwrite')
            const store = tx.objectStore(Stores.EXPENSES)

            try {
                await store.put(transaction)
                return transaction
            } catch (error) {
                console.error('Failed to update transaction:', error)
                throw error
            }
        },
        [getDb]
    )

    return {
        transactionExists,
        getAllTransactions,
        getTransactionById,
        updateTransaction,
    }
}
