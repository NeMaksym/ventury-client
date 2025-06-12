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
} from '@mui/material'

import { SystemTransaction } from '../../types'
import { BodyRow } from './components/BodyRow'

export interface TransactionsTableProps {
    transactions: SystemTransaction[]
    onCommentChange: (transactionId: string, comment: string) => void
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
    transactions,
    onCommentChange,
}) => {
    if (transactions.length === 0) {
        return <Typography>No expense transactions found.</Typography>
    }

    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell align="right">Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction) => (
                        <BodyRow
                            key={transaction.id}
                            transaction={transaction}
                            onCommentChange={onCommentChange}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
