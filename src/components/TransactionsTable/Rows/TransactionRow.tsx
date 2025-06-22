import React from 'react'
import { TableCell, TableRow } from '@mui/material'

import {
    ArrowCell,
    DateCell,
    DescriptionCell,
    CategoryCell,
    AmountCell,
    LabelCell,
    ContextMenuCell,
} from '../Cells'
import { SystemTransaction } from '../../../types'
import { fromSmallestUnit } from '../../../utils'
import { TransactionsTableProps } from '../TransactionsTable'

interface TransactionRowProps extends Pick<TransactionsTableProps, 'handlers'> {
    transaction: SystemTransaction
    isExpanded: boolean
    onClick: () => void
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
    transaction,
    handlers,
    isExpanded,
    onClick,
}) => {
    const hasSubTransactions = transaction.subTransactions.length > 0

    const subTransactionsSum = transaction.subTransactions.reduce(
        (sum, sub) => sum + sub.amount,
        0n
    )
    const subTransactionsRefSum = transaction.subTransactions.reduce(
        (sum, sub) => sum + sub.referenceAmount,
        0n
    )
    const transactionAmount = transaction.amount - subTransactionsSum
    const transactionRefAmount =
        transaction.referenceAmount - subTransactionsRefSum

    return (
        <>
            <TableRow
                sx={{
                    cursor: hasSubTransactions ? 'pointer' : 'default',
                    opacity: transaction.hide ? 0.5 : 1,
                    borderLeft: hasSubTransactions
                        ? (theme) =>
                              `3px solid ${
                                  isExpanded
                                      ? theme.palette.primary.main
                                      : theme.palette.divider
                              }`
                        : 'none',
                }}
                hover={hasSubTransactions}
                onClick={onClick}
            >
                {hasSubTransactions ? (
                    <ArrowCell isExpanded={isExpanded} onToggle={onClick} />
                ) : (
                    <TableCell />
                )}
                <DateCell time={transaction.time} />
                <DescriptionCell
                    description={transaction.description}
                    comment={transaction.comment}
                />
                <AmountCell
                    amount={-fromSmallestUnit(transactionAmount)}
                    currencyCode={transaction.currencyCode}
                    referenceAmount={fromSmallestUnit(transactionRefAmount)}
                    referenceCurrencyCode={transaction.referenceCurrencyCode}
                />
                <CategoryCell
                    transactionId={transaction.id}
                    category={transaction.category}
                    onCategoryChange={handlers.onCategoryChange}
                />
                <LabelCell
                    options={[]}
                    transactionId={transaction.id}
                    labels={transaction.labels}
                    onLabelChange={handlers.onLabelChange}
                />
                <ContextMenuCell
                    transactionId={transaction.id}
                    comment={transaction.comment}
                    isHidden={transaction.hide}
                    isCapitalized={transaction.capitalized}
                    maxSubTransactionAmount={
                        -fromSmallestUnit(transactionAmount)
                    }
                    onCommentChange={handlers.onCommentChange}
                    onHideChange={handlers.onHideChange}
                    onCapitalizeChange={handlers.onCapitalizeChange}
                    onDelete={handlers.onDelete}
                    onSubTransactionCreate={handlers.onSubTransactionCreate}
                />
            </TableRow>
        </>
    )
}
