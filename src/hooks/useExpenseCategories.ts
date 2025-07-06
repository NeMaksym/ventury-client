import { useEffect, useState } from 'react'

import { Category } from '../types'
import { useExpenseCategoryService } from '../db'

interface UseExpenseCategoriesReturn {
    loading: boolean
    error: string | null
    categories: Category[]
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

    return {
        loading,
        error,
        categories,
        setCategories,
    }
}
