import React, { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'

import { useExpenseService } from '../hooks'
import { SystemTransaction } from '../types'
import { TransactionsTable } from '../components'
import { useComment, useCategory, useLabel } from './hooks'

interface ExpensesPageProps {}

export const ExpensesPage: React.FC<ExpensesPageProps> = () => {
    const [transactions, setTransactions] = useState<SystemTransaction[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const { getAllTransactions } = useExpenseService()

    const { handleCommentChange } = useComment({
        setTransactions,
        setError,
    })

    const { handleCategoryChange } = useCategory({
        setTransactions,
        setError,
    })

    const { handleLabelChange } = useLabel({
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
                    onHideChange={(id, isHidden) =>
                        console.log('hide changed', id, isHidden)
                    }
                    onCapitalizeChange={(id, isCapitalized) =>
                        console.log('capitalize changed', id, isCapitalized)
                    }
                    onDelete={(id) => console.log('delete', id)}
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
