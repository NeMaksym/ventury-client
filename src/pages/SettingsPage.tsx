import React from 'react'
import { Typography, Box } from '@mui/material'

import { CategoryList } from '../components'
import { useStore } from '../context/StoreContext'

export const SettingsPage: React.FC = () => {
    const { expenseCategoryStore, expenseStore } = useStore()

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
                    await expenseStore.resetCategory(id)
                    await expenseCategoryStore.remove(id)
                }}
            />
        </Box>
    )
}
