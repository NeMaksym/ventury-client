import React from 'react'
import { Typography, Box, CircularProgress, Alert } from '@mui/material'
import { YearGraph } from '../components'
import { useExpensesData, useExpenseCategories } from '../hooks'
import { fromSmallestUnit } from '../utils/formatAmount'

const ExpensesGraphPage: React.FC = () => {
    const { categoriesMap } = useExpenseCategories()
    const {
        loading,
        error: dataError,
        expenses,
        subExpenses,
    } = useExpensesData('2025-01-01', '2025-12-31')

    console.log('expenses', expenses)
    console.log('subExpenses', subExpenses)

    const renderContent = () => {
        if (loading) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            )
        }

        if (dataError) {
            return (
                <Alert severity="error">
                    Error loading expense data: {dataError}
                </Alert>
            )
        }

        return (
            <YearGraph
                data={[...expenses, ...subExpenses].reduce((acc, expense) => {
                    const category =
                        categoriesMap[expense.category] ?? 'Uncategorized'

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

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Graph
            </Typography>
            {renderContent()}
        </Box>
    )
}

export { ExpensesGraphPage }
