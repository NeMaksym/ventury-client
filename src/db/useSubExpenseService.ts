import { useCallback } from 'react'

import { useDb } from '../context/DbContext'
import { SystemSubTransaction } from '../types'
import { Stores } from './connect'

export interface SubExpenseService {
    getSubExpensesByDateRange: (
        startDate: Date,
        endDate: Date
    ) => Promise<SystemSubTransaction[]>
    getSubExpensesByParentId: (
        parentId: string
    ) => Promise<SystemSubTransaction[]>
    getSubExpensesByCategory: (
        category: string
    ) => Promise<SystemSubTransaction[]>
    getSubExpenseById: (id: string) => Promise<SystemSubTransaction | undefined>
    addSubExpense: (
        subExpense: SystemSubTransaction
    ) => Promise<SystemSubTransaction>
    updateSubExpense: (
        subExpense: SystemSubTransaction
    ) => Promise<SystemSubTransaction>
    deleteSubExpense: (id: string) => Promise<void>
    resetCategory: (category: string) => Promise<void>
}

export function useSubExpenseService(): SubExpenseService {
    const { getDb } = useDb()

    const getSubExpensesByDateRange = useCallback(
        async (
            startDate: Date,
            endDate: Date
        ): Promise<SystemSubTransaction[]> => {
            const db = await getDb()
            const tx = db.transaction(Stores.SUB_EXPENSES, 'readonly')
            const store = tx.objectStore(Stores.SUB_EXPENSES)
            const timeIndex = store.index('time')

            try {
                const range = IDBKeyRange.bound(startDate, endDate)
                return await timeIndex.getAll(range)
            } catch (error) {
                console.error(
                    'Failed to get sub-expenses by date range:',
                    error
                )
                throw error
            }
        },
        [getDb]
    )

    const getSubExpensesByParentId = useCallback(
        async (parentId: string): Promise<SystemSubTransaction[]> => {
            const db = await getDb()
            const tx = db.transaction(Stores.SUB_EXPENSES, 'readonly')
            const store = tx.objectStore(Stores.SUB_EXPENSES)
            const parentIdIndex = store.index('parentId')

            try {
                return await parentIdIndex.getAll(parentId)
            } catch (error) {
                console.error('Failed to get sub-expenses by parent ID:', error)
                throw error
            }
        },
        [getDb]
    )

    const getSubExpensesByCategory = useCallback(
        async (category: string): Promise<SystemSubTransaction[]> => {
            const db = await getDb()
            const tx = db.transaction(Stores.SUB_EXPENSES, 'readonly')
            const store = tx.objectStore(Stores.SUB_EXPENSES)
            const categoryIndex = store.index('category')

            try {
                return await categoryIndex.getAll(category)
            } catch (error) {
                console.error('Failed to get sub-expenses by category:', error)
                throw error
            }
        },
        [getDb]
    )

    const getSubExpenseById = useCallback(
        async (id: string): Promise<SystemSubTransaction | undefined> => {
            const db = await getDb()
            const tx = db.transaction(Stores.SUB_EXPENSES, 'readonly')
            const store = tx.objectStore(Stores.SUB_EXPENSES)

            try {
                return await store.get(id)
            } catch (error) {
                console.error('Failed to get sub-expense by ID:', error)
                throw error
            }
        },
        [getDb]
    )

    const addSubExpense = useCallback(
        async (
            subExpense: SystemSubTransaction
        ): Promise<SystemSubTransaction> => {
            if (subExpense.amount >= 0n) {
                throw new Error('Sub-expense amount must be negative')
            }

            if (subExpense.referenceAmount <= 0n) {
                throw new Error('Sub-expense referenceAmount must be positive')
            }

            const db = await getDb()
            const tx = db.transaction(Stores.SUB_EXPENSES, 'readwrite')
            const store = tx.objectStore(Stores.SUB_EXPENSES)

            try {
                await store.add(subExpense)
                return subExpense
            } catch (error) {
                console.error('Failed to add sub-expense:', error)
                throw error
            }
        },
        [getDb]
    )

    const updateSubExpense = useCallback(
        async (
            subExpense: SystemSubTransaction
        ): Promise<SystemSubTransaction> => {
            const db = await getDb()
            const tx = db.transaction(Stores.SUB_EXPENSES, 'readwrite')
            const store = tx.objectStore(Stores.SUB_EXPENSES)

            try {
                await store.put(subExpense)
                return subExpense
            } catch (error) {
                console.error('Failed to update sub-expense:', error)
                throw error
            }
        },
        [getDb]
    )

    const deleteSubExpense = useCallback(
        async (id: string): Promise<void> => {
            const db = await getDb()
            const tx = db.transaction(Stores.SUB_EXPENSES, 'readwrite')
            const store = tx.objectStore(Stores.SUB_EXPENSES)

            try {
                await store.delete(id)
            } catch (error) {
                console.error('Failed to delete sub-expense:', error)
                throw error
            }
        },
        [getDb]
    )

    const resetCategory = useCallback(
        async (category: string): Promise<void> => {
            const subExpenses = await getSubExpensesByCategory(category)

            for (const subExpense of subExpenses) {
                const updatedSubExpense = { ...subExpense, category: '' }
                await updateSubExpense(updatedSubExpense)
            }
        },
        [getDb]
    )

    return {
        getSubExpensesByDateRange,
        getSubExpensesByParentId,
        getSubExpensesByCategory,
        getSubExpenseById,
        addSubExpense,
        updateSubExpense,
        deleteSubExpense,
        resetCategory,
    }
}
