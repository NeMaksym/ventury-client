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
    { label: 'Date' },
    { label: 'Description' },
    { label: 'Category' },
    { label: 'Amount', cellProps: { align: 'right' } },
]

export interface TransactionsTableProps {
    transactions: SystemTransaction[]
    onCommentChange: (transactionId: string, comment: string) => void
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
    transactions,
    onCommentChange,
}) => {
    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
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
                            />
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
