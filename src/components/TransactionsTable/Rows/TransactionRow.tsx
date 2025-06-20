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

    return (
        <>
            <TableRow
                sx={{
                    cursor: hasSubTransactions ? 'pointer' : 'default',
                    opacity: transaction.hide ? 0.5 : 1,
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                }}
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
                    amount={transaction.amount}
                    currencyCode={transaction.currencyCode}
                    referenceAmount={transaction.referenceAmount}
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
