import { useCallback, useEffect, useState } from 'react'

import { Category } from '../types'
import { useExpenseCategoriesService } from './useExpenseCategoriesService'

export interface UseExpenseCategoriesReturn {
    categories: Category[]
    loading: boolean
    error: string | null
    handleCategoryAdd: (label: string) => Promise<void>
    handleCategoryRename: (id: string, newLabel: string) => Promise<void>
    handleCategoryDelete: (id: string) => Promise<void>
}

export function useExpenseCategories(): UseExpenseCategoriesReturn {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const { getAllCategories, addCategory, renameCategory, removeCategory } =
        useExpenseCategoriesService()

    useEffect(() => {
        getAllCategories()
            .then(setCategories)
            .catch(setError)
            .finally(() => setLoading(false))
    }, [getAllCategories, setCategories, setError, setLoading])

    const handleCategoryAdd = useCallback(
        async (label: string) => {
            try {
                const category = await addCategory(label)
                setCategories((categories) => [...categories, category])
            } catch (err) {
                throw err
            }
        },
        [addCategory, setCategories]
    )

    const handleCategoryRename = useCallback(
        async (id: string, newLabel: string) => {
            try {
                const category = await renameCategory(id, newLabel)
                setCategories((categories) =>
                    categories.map((c) => (c.id === category.id ? category : c))
                )
            } catch (err) {
                throw err
            }
        },
        [renameCategory, setCategories]
    )

    const handleCategoryDelete = useCallback(
        async (id: string) => {
            try {
                await removeCategory(id)
                setCategories((categories) =>
                    categories.filter((c) => c.id !== id)
                )
            } catch (err) {
                throw err
            }
        },
        [removeCategory, setCategories]
    )

    return {
        categories,
        loading,
        error,
        handleCategoryAdd,
        handleCategoryRename,
        handleCategoryDelete,
    }
}
