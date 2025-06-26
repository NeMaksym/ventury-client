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

import { EmptyBodyRow, SubTransactionBodyRow, TransactionBodyRow } from './Rows'
import {
    TransactionActionHandler,
    TransactionDeleteHandler,
    type TransactionRow,
} from './types'
import { TransactionHandlersProvider } from './context'

const TABLE_COLUMNS: { label: string; cellProps?: TableCellProps }[] = [
    { label: 'Date', cellProps: { sx: { width: 120 } } },
    { label: 'Description' },
    { label: 'Amount', cellProps: { align: 'right' } },
    { label: 'Category', cellProps: { sx: { width: 190 } } },
    { label: 'Labels', cellProps: { sx: { width: 190 } } },
    { label: '' },
]

export interface TransactionsTableProps {
    rows: TransactionRow[]
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
    rows,
    handlers,
}) => {
    return (
        <TransactionHandlersProvider handlers={handlers}>
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
                        {rows.length === 0 ? (
                            <EmptyBodyRow colSpan={TABLE_COLUMNS.length} />
                        ) : (
                            rows.map((row) =>
                                'subTransactionId' in row ? (
                                    <SubTransactionBodyRow
                                        key={row.subTransactionId}
                                        data={row}
                                    />
                                ) : (
                                    <TransactionBodyRow
                                        key={row.transactionId}
                                        data={row}
                                    />
                                )
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </TransactionHandlersProvider>
    )
}
