import { useCallback } from 'react'

import { useDb } from '../context/DbContext'
import { SystemTransaction } from '../types'
import { Stores } from '../db/connect'

export interface ExpenseService {
    expenseExists: (expense: SystemTransaction) => Promise<boolean>
    getAllExpenses: () => Promise<SystemTransaction[]>
    getExpensesByDateRange: (
        startDate: Date,
        endDate: Date
    ) => Promise<SystemTransaction[]>
    getExpenseById: (id: string) => Promise<SystemTransaction | undefined>
    addExpense: (expense: SystemTransaction) => Promise<SystemTransaction>
    updateExpense: (expense: SystemTransaction) => Promise<SystemTransaction>
    deleteExpense: (id: string) => Promise<void>
}

export function useExpenseService(): ExpenseService {
    const { getDb } = useDb()

    const expenseExists = useCallback(
        async (expense: SystemTransaction): Promise<boolean> => {
            const db = await getDb()
            const tx = db.transaction(Stores.EXPENSES, 'readonly')
            const store = tx.objectStore(Stores.EXPENSES)
            const timeIndex = store.index('time')

            try {
                const expensesAtSameTime = await timeIndex.getAll(expense.time)

                return expensesAtSameTime.some(
                    (dbExpense) =>
                        dbExpense.bank === expense.bank &&
                        dbExpense.amount === expense.amount
                )
            } catch (error) {
                console.error('Failed to check if expense exists:', error)
                throw error
            }
        },
        [getDb]
    )

    const getAllExpenses = useCallback(async (): Promise<
        SystemTransaction[]
    > => {
        const db = await getDb()
        const tx = db.transaction(Stores.EXPENSES, 'readonly')
        const store = tx.objectStore(Stores.EXPENSES)

        try {
            return await store.getAll()
        } catch (error) {
            console.error('Failed to get all expenses:', error)
            throw error
        }
    }, [getDb])

    const getExpensesByDateRange = useCallback(
        async (
            startDate: Date,
            endDate: Date
        ): Promise<SystemTransaction[]> => {
            const db = await getDb()
            const tx = db.transaction(Stores.EXPENSES, 'readonly')
            const store = tx.objectStore(Stores.EXPENSES)
            const timeIndex = store.index('time')

            try {
                const range = IDBKeyRange.bound(startDate, endDate)
                return await timeIndex.getAll(range)
            } catch (error) {
                console.error('Failed to get expenses by date range:', error)
                throw error
            }
        },
        [getDb]
    )

    const getExpenseById = useCallback(
        async (id: string): Promise<SystemTransaction | undefined> => {
            const db = await getDb()
            const tx = db.transaction(Stores.EXPENSES, 'readonly')
            const store = tx.objectStore(Stores.EXPENSES)

            try {
                return await store.get(id)
            } catch (error) {
                console.error('Failed to get expense by id:', error)
                throw error
            }
        },
        [getDb]
    )

    const updateExpense = useCallback(
        async (expense: SystemTransaction): Promise<SystemTransaction> => {
            const db = await getDb()
            const tx = db.transaction(Stores.EXPENSES, 'readwrite')
            const store = tx.objectStore(Stores.EXPENSES)

            try {
                await store.put(expense)
                return expense
            } catch (error) {
                console.error('Failed to update expense:', error)
                throw error
            }
        },
        [getDb]
    )

    const addExpense = useCallback(
        async (expense: SystemTransaction): Promise<SystemTransaction> => {
            if (expense.amount >= 0n) {
                throw new Error('Expense amount must be negative')
            }

            if (expense.referenceAmount <= 0n) {
                throw new Error('Expense referenceAmount must be positive')
            }

            if (expense.operationAmount <= 0n) {
                throw new Error('Expense operationAmount must be positive')
            }

            const db = await getDb()
            const tx = db.transaction(Stores.EXPENSES, 'readwrite')
            const store = tx.objectStore(Stores.EXPENSES)

            try {
                await store.add(expense)
                return expense
            } catch (error) {
                console.error('Failed to add expense:', error)
                throw error
            }
        },
        [getDb]
    )

    const deleteExpense = useCallback(
        async (id: string): Promise<void> => {
            const db = await getDb()
            const tx = db.transaction(Stores.EXPENSES, 'readwrite')
            const store = tx.objectStore(Stores.EXPENSES)

            try {
                await store.delete(id)
            } catch (error) {
                console.error('Failed to delete expense:', error)
                throw error
            }
        },
        [getDb]
    )

    return {
        expenseExists,
        getAllExpenses,
        getExpensesByDateRange,
        getExpenseById,
        addExpense,
        updateExpense,
        deleteExpense,
    }
}
