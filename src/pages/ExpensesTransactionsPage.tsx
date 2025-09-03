import React from 'react'
import { Typography, Box, Stack } from '@mui/material'

import { TransactionsTable, TransactionsFilter } from '../components'
import { useStore } from '../context/StoreContext'
import { useExpenseHandlers } from '../hooks'

export const ExpensesTransactionsPage: React.FC = () => {
    const {
        expenseCategoryStore,
        expenseStore,
        expenseFilterStore,
        expenseListStore,
    } = useStore()

    const handlers = useExpenseHandlers()

    const renderContent = () => {
        if (expenseStore.loading) {
            return <Typography>Loading transactions...</Typography>
        }

        if (expenseStore.error) {
            return (
                <Typography color="error">
                    Error: {expenseStore.error}
                </Typography>
            )
        }

        return (
            <Stack spacing={4}>
                <Stack direction="row" spacing={2}>
                    {/* TODO: Make this section collapsable */}
                    <Typography variant="body1" gutterBottom>
                        Total transactions: {expenseListStore.rows.length}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Total amount: {expenseListStore.amounts.totalAmount} (
                        {expenseListStore.amounts.totalRefAmount})
                    </Typography>
                </Stack>
                <TransactionsFilter />
                <TransactionsTable
                    rows={expenseListStore.rows}
                    handlers={handlers}
                    options={{
                        categories: expenseCategoryStore.categories,
                        labels: expenseFilterStore.labelOptions,
                    }}
                />
            </Stack>
        )
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Transactions
            </Typography>
            {renderContent()}
        </Box>
    )
}
