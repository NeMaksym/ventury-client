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
import { TransactionActionHandler, TransactionDeleteHandler } from '../types'
import { SystemTransaction } from '../../../types'
import { fromSmallestUnit } from '../../../utils'

interface TransactionRowProps {
    transaction: SystemTransaction
    onCommentChange: TransactionActionHandler<string>
    onCategoryChange: TransactionActionHandler<string | null>
    onLabelChange: TransactionActionHandler<string[]>
    onHideChange: TransactionActionHandler<boolean>
    onCapitalizeChange: TransactionActionHandler<boolean>
    onDelete: TransactionDeleteHandler
    onSubTransactionCreate: TransactionActionHandler<number>
    isExpanded: boolean
    onClick: () => void
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
    transaction,
    onCommentChange,
    onCategoryChange,
    onLabelChange,
    onHideChange,
    onCapitalizeChange,
    onDelete,
    onSubTransactionCreate,
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
                }}
                hover
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
                    onCategoryChange={onCategoryChange}
                />
                <LabelCell
                    options={[]}
                    transactionId={transaction.id}
                    labels={transaction.labels}
                    onLabelChange={onLabelChange}
                />
                <ContextMenuCell
                    transactionId={transaction.id}
                    comment={transaction.comment}
                    isHidden={transaction.hide}
                    isCapitalized={transaction.capitalized}
                    maxSubTransactionAmount={
                        -fromSmallestUnit(transactionAmount)
                    }
                    onCommentChange={onCommentChange}
                    onHideChange={onHideChange}
                    onCapitalizeChange={onCapitalizeChange}
                    onDelete={onDelete}
                    onSubTransactionCreate={onSubTransactionCreate}
                />
            </TableRow>
        </>
    )
}
