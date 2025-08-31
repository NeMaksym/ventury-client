import React from 'react'
import { Typography, Box } from '@mui/material'

import { CategoryList } from '../components'
import { useExpenseService, useSubExpenseService } from '../db'
import { useStore } from '../context/StoreContext'

export const SettingsPage: React.FC = () => {
    const { expenseCategoryStore } = useStore()
    const expenseService = useExpenseService()
    const subExpenseService = useSubExpenseService()

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>
            <CategoryList
                categories={expenseCategoryStore.categories}
                onCategoryAdd={(label) => expenseCategoryStore.add(label)}
                onCategoryEdit={(id, newLabel) =>
                    expenseCategoryStore.rename(id, newLabel)
                }
                onCategoryDelete={async (id) => {
                    await Promise.all([
                        expenseService.resetCategory(id),
                        subExpenseService.resetCategory(id),
                    ])
                    await expenseCategoryStore.remove(id)
                }}
            />
        </Box>
    )
}
