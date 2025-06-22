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
import { EmptyBodyRow, TransactionGroup } from './Rows'

import { TransactionActionHandler, TransactionDeleteHandler } from './types'

const TABLE_COLUMNS: { label: string; cellProps?: TableCellProps }[] = [
    { label: '' },
    { label: 'Date', cellProps: { sx: { width: 120 } } },
    { label: 'Description' },
    { label: 'Amount', cellProps: { align: 'right' } },
    { label: 'Category', cellProps: { sx: { width: 190 } } },
    { label: 'Labels', cellProps: { sx: { width: 190 } } },
    { label: '' },
]

export interface TransactionsTableProps {
    transactions: SystemTransaction[]
    handlers: {
        onCommentChange: TransactionActionHandler<string>
        onCategoryChange: TransactionActionHandler<string | null>
        onLabelChange: TransactionActionHandler<string[]>
        onHideChange: TransactionActionHandler<boolean>
        onCapitalizeChange: TransactionActionHandler<boolean>
        onDelete: TransactionDeleteHandler
        onSubTransactionCreate: TransactionActionHandler<number>
    }
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
    transactions,
    handlers,
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
                            <TransactionGroup
                                key={transaction.id}
                                transaction={transaction}
                                handlers={handlers}
                            />
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
