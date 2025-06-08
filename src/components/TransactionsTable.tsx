import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Tooltip,
} from '@mui/material'

import { SystemTransaction } from '../types'

interface TransactionsTableProps {
    transactions: SystemTransaction[]
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
    transactions,
}) => {
    const formatAmount = (amount: bigint): string => {
        return (Number(amount) / 100).toFixed(2)
    }

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    if (transactions.length === 0) {
        return <Typography>No expense transactions found.</Typography>
    }

    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell align="right">Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell>
                                {formatDate(transaction.time)}
                            </TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell>{transaction.category || '-'}</TableCell>
                            <TableCell align="right">
                                <Tooltip
                                    title={`$${formatAmount(
                                        transaction.referenceAmount
                                    )}`}
                                >
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: 'error.main',
                                            fontWeight: 'bold',
                                            cursor: 'help',
                                        }}
                                    >
                                        {formatAmount(transaction.amount)}
                                    </Typography>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
