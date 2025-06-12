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
    Collapse,
} from '@mui/material'

import { SystemTransaction } from '../../types'
import { Date } from './Date'
import { Arrow } from './Arrow'
import { Category } from './Category'
import { Amount } from './Amount'
import { Comment } from './Comment'
import { useExpandedRows } from './hooks/useExpandedRows'

export interface TransactionsTableProps {
    transactions: SystemTransaction[]
    onCommentChange: (transactionId: string, comment: string) => void
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
    transactions,
    onCommentChange,
}) => {
    const { isExpanded, toggleRow } = useExpandedRows()

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
                        <React.Fragment key={transaction.id}>
                            <TableRow
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    },
                                }}
                                onClick={() => toggleRow(transaction.id)}
                            >
                                <Arrow
                                    isExpanded={isExpanded(transaction.id)}
                                    onToggle={() => toggleRow(transaction.id)}
                                />
                                <Date time={transaction.time} />
                                <TableCell>{transaction.description}</TableCell>
                                <Category category={transaction.category} />
                                <Amount
                                    amount={transaction.amount}
                                    referenceAmount={
                                        transaction.referenceAmount
                                    }
                                />
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    style={{ paddingBottom: 0, paddingTop: 0 }}
                                    colSpan={5}
                                >
                                    <Collapse
                                        in={isExpanded(transaction.id)}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <Comment
                                            transactionId={transaction.id}
                                            comment={transaction.comment}
                                            onCommentChange={onCommentChange}
                                        />
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
