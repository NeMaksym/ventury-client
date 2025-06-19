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
import { TransactionRow, SubTransactionRow, EmptyBodyRow } from './components'

const TABLE_COLUMNS: { label: string; cellProps?: TableCellProps }[] = [
    { label: '' },
    { label: 'Date', cellProps: { sx: { width: 120 } } },
    { label: 'Description' },
    { label: 'Amount', cellProps: { align: 'right' } },
    { label: 'Category', cellProps: { sx: { width: 190 } } },
    { label: 'Labels', cellProps: { sx: { width: 190 } } },
    { label: '' },
]

export type TransactionActionHandler<T> = (
    transactionId: string,
    value: T,
    subTransactionId?: string
) => void

export type TransactionDeleteHandler = (
    transactionId: string,
    subTransactionId?: string
) => void

export interface SubTransactionData {
    description: string
    amount: number
}

export type SubTransactionCreateHandler = (
    transactionId: string,
    data: SubTransactionData
) => void

export interface TransactionsTableProps {
    transactions: SystemTransaction[]
    onCommentChange: TransactionActionHandler<string>
    onCategoryChange: TransactionActionHandler<string | null>
    onLabelChange: TransactionActionHandler<string[]>
    onHideChange: TransactionActionHandler<boolean>
    onCapitalizeChange: TransactionActionHandler<boolean>
    onDelete: TransactionDeleteHandler
    onSubTransactionCreate: SubTransactionCreateHandler
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
    transactions,
    onCommentChange,
    onCategoryChange,
    onLabelChange,
    onHideChange,
    onCapitalizeChange,
    onDelete,
    onSubTransactionCreate,
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
                            <React.Fragment key={transaction.id}>
                                <TransactionRow
                                    key={transaction.id}
                                    transaction={transaction}
                                    onCommentChange={onCommentChange}
                                    onCategoryChange={onCategoryChange}
                                    onLabelChange={onLabelChange}
                                    onHideChange={onHideChange}
                                    onCapitalizeChange={onCapitalizeChange}
                                    onDelete={onDelete}
                                    onSubTransactionCreate={
                                        onSubTransactionCreate
                                    }
                                />
                                {transaction.subTransactions?.map(
                                    (subTransaction) => (
                                        <SubTransactionRow
                                            key={subTransaction.id}
                                            transaction={transaction}
                                            subTransaction={subTransaction}
                                            onCategoryChange={onCategoryChange}
                                            onLabelChange={onLabelChange}
                                            onHideChange={onHideChange}
                                            onCapitalizeChange={
                                                onCapitalizeChange
                                            }
                                            onDelete={onDelete}
                                        />
                                    )
                                )}
                            </React.Fragment>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
