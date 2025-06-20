import React from 'react'
import { TableCell, TableRow } from '@mui/material'

import { SystemSubTransaction, SystemTransaction } from '../../../types'
import {
    DescriptionCell,
    CategoryCell,
    AmountCell,
    LabelCell,
    ContextMenuCell,
} from '../Cells'
import { TransactionActionHandler, TransactionDeleteHandler } from '../types'

interface SubTransactionRowProps {
    transaction: SystemTransaction
    subTransaction: SystemSubTransaction
    onCommentChange: TransactionActionHandler<string>
    onCategoryChange: TransactionActionHandler<string | null>
    onLabelChange: TransactionActionHandler<string[]>
    onHideChange: TransactionActionHandler<boolean>
    onCapitalizeChange: TransactionActionHandler<boolean>
    onDelete: TransactionDeleteHandler
}

export const SubTransactionRow: React.FC<SubTransactionRowProps> = ({
    transaction,
    subTransaction,
    onCommentChange,
    onCategoryChange,
    onLabelChange,
    onHideChange,
    onCapitalizeChange,
    onDelete,
}) => {
    return (
        <TableRow
            sx={{
                cursor: 'pointer',
                opacity: subTransaction.hide ? 0.5 : 1,
                '&:hover': {
                    backgroundColor: 'action.hover',
                },
            }}
        >
            <TableCell />
            <TableCell />
            <DescriptionCell
                description={subTransaction.description}
                comment={subTransaction.comment}
            />
            <AmountCell
                amount={subTransaction.amount}
                currencyCode={transaction.currencyCode}
                referenceAmount={subTransaction.referenceAmount}
                referenceCurrencyCode={transaction.referenceCurrencyCode}
            />
            <CategoryCell
                transactionId={transaction.id}
                subTransactionId={subTransaction.id}
                category={subTransaction.category}
                onCategoryChange={onCategoryChange}
            />
            <LabelCell
                options={[]}
                transactionId={transaction.id}
                subTransactionId={subTransaction.id}
                labels={subTransaction.labels}
                onLabelChange={onLabelChange}
            />
            <ContextMenuCell
                transactionId={transaction.id}
                subTransactionId={subTransaction.id}
                comment={subTransaction.comment}
                isHidden={subTransaction.hide}
                isCapitalized={subTransaction.capitalized}
                onCommentChange={onCommentChange}
                onHideChange={onHideChange}
                onCapitalizeChange={onCapitalizeChange}
                onDelete={onDelete}
            />
        </TableRow>
    )
}
