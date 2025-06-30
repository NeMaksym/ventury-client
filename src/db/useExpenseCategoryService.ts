import { useCallback } from 'react'

import { useDb } from '../context/DbContext'
import { Category } from '../types'
import { Stores } from './connect'

export interface ExpenseCategoryService {
    getAllCategories: () => Promise<Category[]>
    getCategoryById: (id: string) => Promise<Category | undefined>
    addCategory: (label: string) => Promise<Category>
    removeCategory: (id: string) => Promise<void>
    renameCategory: (id: string, newLabel: string) => Promise<Category>
}

export function useExpenseCategoryService(): ExpenseCategoryService {
    const { getDb } = useDb()

    const getAllCategories = useCallback(async (): Promise<Category[]> => {
        const db = await getDb()
        const tx = db.transaction(Stores.EXPENSE_CATEGORIES, 'readonly')
        const store = tx.objectStore(Stores.EXPENSE_CATEGORIES)

        try {
            return await store.getAll()
        } catch (error) {
            console.error('Failed to get all expense categories:', error)
            throw error
        }
    }, [getDb])

    const getCategoryById = useCallback(
        async (id: string): Promise<Category | undefined> => {
            const db = await getDb()
            const tx = db.transaction(Stores.EXPENSE_CATEGORIES, 'readonly')
            const store = tx.objectStore(Stores.EXPENSE_CATEGORIES)

            try {
                return await store.get(id)
            } catch (error) {
                console.error('Failed to get expense category by id:', error)
                throw error
            }
        },
        [getDb]
    )

    const addCategory = useCallback(
        async (label: string): Promise<Category> => {
            if (!label.trim()) {
                throw new Error('Category label cannot be empty')
            }

            const category: Category = {
                id: crypto.randomUUID(),
                label: label.trim(),
            }

            const db = await getDb()
            const tx = db.transaction(Stores.EXPENSE_CATEGORIES, 'readwrite')
            const store = tx.objectStore(Stores.EXPENSE_CATEGORIES)

            try {
                await store.add(category)
                return category
            } catch (error) {
                console.error('Failed to add expense category:', error)
                throw error
            }
        },
        [getDb]
    )

    const removeCategory = useCallback(
        async (id: string): Promise<void> => {
            const db = await getDb()
            const tx = db.transaction(Stores.EXPENSE_CATEGORIES, 'readwrite')
            const store = tx.objectStore(Stores.EXPENSE_CATEGORIES)

            try {
                await store.delete(id)
            } catch (error) {
                console.error('Failed to remove expense category:', error)
                throw error
            }
        },
        [getDb]
    )

    const renameCategory = useCallback(
        async (id: string, newLabel: string): Promise<Category> => {
            if (!newLabel.trim()) {
                throw new Error('Category label cannot be empty')
            }

            const db = await getDb()
            const tx = db.transaction(Stores.EXPENSE_CATEGORIES, 'readwrite')
            const store = tx.objectStore(Stores.EXPENSE_CATEGORIES)

            try {
                const existingCategory = await store.get(id)
                if (!existingCategory) {
                    throw new Error(`Category with id "${id}" not found`)
                }

                const updatedCategory: Category = {
                    ...existingCategory,
                    label: newLabel.trim(),
                }

                await store.put(updatedCategory)
                return updatedCategory
            } catch (error) {
                console.error('Failed to rename expense category:', error)
                throw error
            }
        },
        [getDb]
    )

    return {
        getAllCategories,
        getCategoryById,
        addCategory,
        removeCategory,
        renameCategory,
    }
}
