import React from 'react'
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableCell,
    type TableCellProps,
} from '@mui/material'

import { SystemTransaction } from '../../types'
import { BodyRow, EmptyBodyRow } from './components'

const TABLE_COLUMNS: { label: string; cellProps?: TableCellProps }[] = [
    { label: '' },
    { label: 'Date', cellProps: { sx: { width: 120 } } },
    { label: 'Description' },
    { label: 'Amount', cellProps: { align: 'right' } },
    { label: 'Category', cellProps: { sx: { width: 190 } } },
    { label: 'Labels', cellProps: { sx: { width: 190 } } },
]

export interface TransactionsTableProps {
    transactions: SystemTransaction[]
    onCommentChange: (transactionId: string, comment: string) => void
    onCategoryChange: (transactionId: string, category: string | null) => void
    onLabelChange: (transactionId: string, labels: string[]) => void
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
    transactions,
    onCommentChange,
    onCategoryChange,
    onLabelChange,
}) => {
    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {TABLE_COLUMNS.map((column, index) => (
                            <TableCell key={index} {...column.cellProps}>
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.length === 0 ? (
                        <EmptyBodyRow colSpan={TABLE_COLUMNS.length} />
                    ) : (
                        transactions.map((transaction) => (
                            <BodyRow
                                key={transaction.id}
                                transaction={transaction}
                                onCommentChange={onCommentChange}
                                onCategoryChange={onCategoryChange}
                                onLabelChange={onLabelChange}
                            />
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
