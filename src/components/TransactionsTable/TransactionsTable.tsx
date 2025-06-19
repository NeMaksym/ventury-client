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
import { SubTransactionFormData } from '../../hooks/useTransaction'

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
    onCommentChange: (transactionId: string, comment: string) => void
    onCategoryChange: (transactionId: string, category: string | null) => void
    onCategoryChangeSub: (
        transactionId: string,
        subTransactionId: string,
        category: string | null
    ) => void
    onLabelChange: (transactionId: string, labels: string[]) => void
    onLabelChangeSub: (
        transactionId: string,
        subTransactionId: string,
        labels: string[]
    ) => void
    onHideChange: (transactionId: string, isHidden: boolean) => void
    onHideChangeSub: (
        transactionId: string,
        subTransactionId: string,
        isHidden: boolean
    ) => void
    onCapitalizeChange: (transactionId: string, isCapitalized: boolean) => void
    onCapitalizeChangeSub: (
        transactionId: string,
        subTransactionId: string,
        isCapitalized: boolean
    ) => void
    onDelete: (transactionId: string) => void
    onDeleteSub: (transactionId: string, subTransactionId: string) => void
    onSubTransactionCreate: (
        transactionId: string,
        data: SubTransactionFormData
    ) => void
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
    onCategoryChangeSub,
    onLabelChangeSub,
    onHideChangeSub,
    onCapitalizeChangeSub,
    onDeleteSub,
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
                                            onCategoryChange={(
                                                subTransactionId,
                                                categories
                                            ) =>
                                                onCategoryChangeSub(
                                                    transaction.id,
                                                    subTransactionId,
                                                    categories
                                                )
                                            }
                                            onLabelChange={(
                                                subTransactionId,
                                                labels
                                            ) =>
                                                onLabelChangeSub(
                                                    transaction.id,
                                                    subTransactionId,
                                                    labels
                                                )
                                            }
                                            onHideChange={(
                                                subTransactionId,
                                                isHidden
                                            ) =>
                                                onHideChangeSub(
                                                    transaction.id,
                                                    subTransactionId,
                                                    isHidden
                                                )
                                            }
                                            onCapitalizeChange={(
                                                subTransactionId,
                                                isCapitalized
                                            ) =>
                                                onCapitalizeChangeSub(
                                                    transaction.id,
                                                    subTransactionId,
                                                    isCapitalized
                                                )
                                            }
                                            onDelete={(subTransactionId) =>
                                                onDeleteSub(
                                                    transaction.id,
                                                    subTransactionId
                                                )
                                            }
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
