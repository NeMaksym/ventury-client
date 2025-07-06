import React from 'react'
import { Typography, Box } from '@mui/material'

import { CategoryList } from '../components'
import { useExpenseCategories, useExpenseCategoriesHandlers } from '../hooks'
import { useExpenseService, useSubExpenseService } from '../db'

export const SettingsPage: React.FC = () => {
    const expenseService = useExpenseService()
    const subExpenseService = useSubExpenseService()

    const { categories, setCategories } = useExpenseCategories()
    const { handleCategoryAdd, handleCategoryRename, handleCategoryDelete } =
        useExpenseCategoriesHandlers(setCategories)

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>
            <CategoryList
                categories={categories}
                onCategoryAdd={handleCategoryAdd}
                onCategoryEdit={handleCategoryRename}
                onCategoryDelete={async (id) => {
                    await Promise.all([
                        expenseService.resetCategory(id),
                        subExpenseService.resetCategory(id),
                    ])
                    await handleCategoryDelete(id)
                }}
            />
        </Box>
    )
}
