import { useEffect, useMemo, useState } from 'react'

import { Category } from '../types'
import { useExpenseCategoryService } from '../db'

type CategoriesMap = Record<Category['id'], Category['label']>

interface UseExpenseCategoriesReturn {
    loading: boolean
    error: string | null
    categories: Category[]
    categoriesMap: CategoriesMap
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

export function useExpenseCategories(): UseExpenseCategoriesReturn {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const { getAllCategories } = useExpenseCategoryService()

    useEffect(() => {
        getAllCategories()
            .then(setCategories)
            .catch(setError)
            .finally(() => setLoading(false))
    }, [getAllCategories, setCategories, setError, setLoading])

    const categoriesMap = useMemo(() => {
        const map: CategoriesMap = {}

        for (const category of categories) {
            map[category.id] = category.label
        }

        return map
    }, [categories])

    return {
        loading,
        error,
        categories,
        categoriesMap,
        setCategories,
    }
}
