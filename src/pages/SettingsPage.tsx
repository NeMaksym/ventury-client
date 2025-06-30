import React from 'react'
import { Typography, Box } from '@mui/material'

import { CategoryList } from '../components'
import { useExpenseCategories } from '../hooks'
import { useExpenseService, useSubExpenseService } from '../db'

export const SettingsPage: React.FC = () => {
    const {
        categories,
        handleCategoryAdd,
        handleCategoryRename,
        handleCategoryDelete,
    } = useExpenseCategories()
    const expenseService = useExpenseService()
    const subExpenseService = useSubExpenseService()

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
