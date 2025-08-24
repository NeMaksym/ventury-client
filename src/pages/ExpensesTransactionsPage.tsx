import React from 'react'
import { Typography, Box, Stack } from '@mui/material'

import {
    useExpensesData,
    useExpensesHandlers,
    useFilterValues,
    useFilterOptions,
    useExpenseCategories,
    useExpenseTable,
} from '../hooks'
import { TransactionsTable, TransactionsFilter } from '../components'

export const ExpensesTransactionsPage: React.FC = () => {
    const { categories } = useExpenseCategories()

    const { values: filterValues, handlers: filterHandlers } = useFilterValues()

    const {
        loading,
        error: dataError,
        expenses,
        subExpenses,
        setExpenses,
        setSubExpenses,
    } = useExpensesData(filterValues.startDate, filterValues.endDate)

    const { error: handlerError, handlers: expensesHandlers } =
        useExpensesHandlers(setExpenses, setSubExpenses)

    // "totalAmount" won't work if transactions of different currencies are present
    // TODO: Count total by currency
    const { rows, totalAmount, totalRefAmount } = useExpenseTable(
        expenses,
        subExpenses,
        filterValues
    )

    const filterOptions = useFilterOptions(expenses, subExpenses, categories)

    const renderContent = () => {
        if (loading) {
            return <Typography>Loading transactions...</Typography>
        }

        if (dataError || handlerError) {
            return (
                <Typography color="error">
                    Error: {dataError || handlerError}
                </Typography>
            )
        }

        return (
            <Stack spacing={4}>
                <Stack direction="row" spacing={2}>
                    {/* TODO: Make this section collapsable */}
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
                Transactions
            </Typography>
            {renderContent()}
        </Box>
    )
}
