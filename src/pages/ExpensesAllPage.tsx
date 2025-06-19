import React, { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'

import { useExpenseService, useTransaction } from '../hooks'
import { SystemTransaction } from '../types'
import { TransactionsTable } from '../components'

interface ExpensesPageProps {}

export const ExpensesPage: React.FC<ExpensesPageProps> = () => {
    const [transactions, setTransactions] = useState<SystemTransaction[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

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
            <>
                <Typography variant="body1" gutterBottom>
                    Total transactions: {transactions.length}
                </Typography>
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
            </>
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
