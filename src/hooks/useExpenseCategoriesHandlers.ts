import { useCallback, useState } from 'react'

import { Category } from '../types'
import { useExpenseCategoryService } from '../db'

interface UseExpenseCategoriesReturn {
    error: string | null
    handleCategoryAdd: (label: string) => Promise<void>
    handleCategoryRename: (id: string, newLabel: string) => Promise<void>
    handleCategoryDelete: (id: string) => Promise<void>
}

export function useExpenseCategoriesHandlers(
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>
): UseExpenseCategoriesReturn {
    const [error, setError] = useState<string | null>(null)

    const { addCategory, renameCategory, removeCategory } =
        useExpenseCategoryService()

    const handleCategoryAdd = useCallback(
        async (label: string) => {
            try {
                const category = await addCategory(label)
                setCategories((categories) => [...categories, category])
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to add category'
                )
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
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to rename category'
                )
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
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to delete category'
                )
            }
        },
        [removeCategory, setCategories]
    )

    return {
        error,
        handleCategoryAdd,
        handleCategoryRename,
        handleCategoryDelete,
    }
}
