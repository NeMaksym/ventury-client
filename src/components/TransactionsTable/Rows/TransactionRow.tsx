import React from 'react'
import { TableRow } from '@mui/material'

import {
    Arrow,
    Date,
    Description,
    Category,
    Amount,
    Label,
    ContextMenu,
} from '../Cells'
import {
    SubTransactionCreateHandler,
    TransactionActionHandler,
    TransactionDeleteHandler,
} from '../types'
import { SystemTransaction } from '../../../types'

interface TransactionRowProps {
    transaction: SystemTransaction
    onCommentChange: TransactionActionHandler<string>
    onCategoryChange: TransactionActionHandler<string | null>
    onLabelChange: TransactionActionHandler<string[]>
    onHideChange: TransactionActionHandler<boolean>
    onCapitalizeChange: TransactionActionHandler<boolean>
    onDelete: TransactionDeleteHandler
    onSubTransactionCreate: SubTransactionCreateHandler
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
}) => {
    return (
        <>
            <TableRow
                sx={{
                    cursor: 'pointer',
                    opacity: transaction.hide ? 0.5 : 1,
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                }}
            >
                <Arrow isExpanded={false} onToggle={() => {}} />
                <Date time={transaction.time} />
                <Description
                    description={transaction.description}
                    comment={transaction.comment}
                />
                <Amount
                    amount={transaction.amount}
                    currencyCode={transaction.currencyCode}
                    referenceAmount={transaction.referenceAmount}
                    referenceCurrencyCode={transaction.referenceCurrencyCode}
                />
                <Category
                    transactionId={transaction.id}
                    category={transaction.category}
                    onCategoryChange={onCategoryChange}
                />
                <Label
                    options={[]}
                    transactionId={transaction.id}
                    labels={transaction.labels}
                    onLabelChange={onLabelChange}
                />
                <ContextMenu
                    transactionId={transaction.id}
                    isHidden={transaction.hide}
                    isCapitalized={transaction.capitalized}
                    onHideChange={onHideChange}
                    onCapitalizeChange={onCapitalizeChange}
                    onDelete={onDelete}
                    onSubTransactionCreate={onSubTransactionCreate}
                />
            </TableRow>
        </>
    )
}
