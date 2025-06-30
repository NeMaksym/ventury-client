import React from 'react'
import { Typography, Box, Stack } from '@mui/material'

import {
    useExpenses,
    useFilterValues,
    useFilterOptions,
    useExpenseCategories,
    useExpenseTable,
} from '../hooks'
import { TransactionsTable, TransactionsFilter } from '../components'

export const ExpensesPage: React.FC = () => {
    const filterOptions = useFilterOptions()
    const { categories } = useExpenseCategories()

    const { values: filterValues, handlers: filterHandlers } = useFilterValues()

    const {
        loading,
        error,
        expenses,
        subExpenses,
        handlers: expensesHandlers,
    } = useExpenses(filterValues)

    const { rows, totalAmount, totalRefAmount } = useExpenseTable(
        expenses,
        subExpenses,
        filterValues
    )

    const renderContent = () => {
        if (loading) {
            return <Typography>Loading transactions...</Typography>
        }

        if (error) {
            return <Typography color="error">Error: {error}</Typography>
        }

        return (
            <Stack spacing={4}>
                <Stack direction="row" spacing={2}>
                    <Typography variant="body1" gutterBottom>
                        Total transactions: {rows.length}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Total amount: {totalAmount} ({totalRefAmount})
                    </Typography>
                </Stack>
                <TransactionsFilter
                    options={filterOptions}
                    values={filterValues}
                    handlers={filterHandlers}
                />
                <TransactionsTable
                    rows={rows}
                    handlers={expensesHandlers}
                    options={{
                        categories,
                        labels: filterOptions.labels,
                    }}
                />
            </Stack>
        )
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Expenses
            </Typography>
            {renderContent()}
        </Box>
    )
}
