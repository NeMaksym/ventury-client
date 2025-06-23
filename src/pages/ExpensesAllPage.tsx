import React from 'react'
import { Typography, Box, Stack } from '@mui/material'

import { useExpenses, useFilterValues, useFilterOptions } from '../hooks'
import { TransactionsTable, TransactionsFilter } from '../components'

export const ExpensesPage: React.FC = () => {
    const filterOptions = useFilterOptions()
    const { values: filterValues, handlers: filterHandlers } = useFilterValues()

    const {
        loading,
        error,
        transactions,
        handlers: expensesHandlers,
    } = useExpenses(filterValues)

    const renderContent = () => {
        if (loading) {
            return <Typography>Loading transactions...</Typography>
        }

        if (error) {
            return <Typography color="error">Error: {error}</Typography>
        }

        return (
            <Stack spacing={4}>
                <Typography variant="body1" gutterBottom>
                    Total transactions: {transactions.length}
                </Typography>
                <TransactionsFilter
                    options={filterOptions}
                    values={filterValues}
                    handlers={filterHandlers}
                />
                <TransactionsTable
                    transactions={transactions}
                    handlers={expensesHandlers}
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
