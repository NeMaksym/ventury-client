import React, { useState, useEffect } from 'react'
import { Typography, Box, Stack } from '@mui/material'

import {
    useExpenseService,
    useTransaction,
    useFilterValues,
    useFilterOptions,
} from '../hooks'
import { SystemTransaction } from '../types'
import { TransactionsTable, TransactionsFilter } from '../components'

export const ExpensesPage: React.FC = () => {
    const [transactions, setTransactions] = useState<SystemTransaction[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const { values, handlers } = useFilterValues()
    const options = useFilterOptions()

    useEffect(() => {
        console.log('values', values)
    }, [values])

    const { getAllTransactions } = useExpenseService()

    const {
        handleCommentChange,
        handleCategoryChange,
        handleLabelChange,
        handleHideChange,
        handleCapitalizeChange,
        handleDelete,
        handleSubTransactionCreate,
    } = useTransaction({
        setTransactions,
        setError,
    })

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await getAllTransactions()
                setTransactions(
                    data.sort((a, b) => b.time.getTime() - a.time.getTime())
                )
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to load transactions'
                )
            } finally {
                setLoading(false)
            }
        }

        fetchTransactions()
    }, [getAllTransactions])

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
                    options={options}
                    values={values}
                    handlers={handlers}
                />
                <TransactionsTable
                    transactions={transactions}
                    onCommentChange={handleCommentChange}
                    onCategoryChange={handleCategoryChange}
                    onLabelChange={handleLabelChange}
                    onHideChange={handleHideChange}
                    onCapitalizeChange={handleCapitalizeChange}
                    onDelete={handleDelete}
                    onSubTransactionCreate={handleSubTransactionCreate}
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
