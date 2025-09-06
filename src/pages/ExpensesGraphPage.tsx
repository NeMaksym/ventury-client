import React from 'react'
import { Box, CircularProgress, Alert } from '@mui/material'

import { YearGraph, PageLayout } from '../components'
import { fromSmallestUnit } from '../utils/formatAmount'
import { useStore } from '../context/StoreContext'

const ExpensesGraphPage: React.FC = () => {
    const { expenseCategoryStore, expenseStore } = useStore()

    const renderContent = () => {
        if (expenseStore.loading) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            )
        }

        if (expenseStore.error) {
            return (
                <Alert severity="error">
                    Error loading expense data: {expenseStore.error}
                </Alert>
            )
        }

        return (
            <YearGraph
                data={[
                    ...expenseStore.expenses,
                    ...expenseStore.subExpenses,
                ].reduce((acc, expense) => {
                    const category =
                        expenseCategoryStore.categoriesMap[expense.category] ??
                        'Uncategorized'

                    if (!category) {
                        return acc
                    }

                    if (acc[category] === undefined) {
                        acc[category] = Array(12).fill(0)
                    }

                    const refAmount = fromSmallestUnit(expense.referenceAmount)
                    const month = new Date(expense.time).getMonth()

                    if (acc[category][month] !== undefined) {
                        acc[category][month] += refAmount
                    }

                    return acc
                }, {} as Record<string, number[]>)}
            />
        )
    }

    return <PageLayout title="Graph">{renderContent()}</PageLayout>
}

export { ExpensesGraphPage }
