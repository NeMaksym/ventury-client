import React from 'react'
import { TableRow, TableCell } from '@mui/material'

import { SystemSubTransaction, SystemTransaction } from '../../../types'
import { Description, Category, Amount, Label, ContextMenuCell } from '../Cells'
import { TransactionActionHandler, TransactionDeleteHandler } from '../types'

interface SubTransactionRowProps {
    transaction: SystemTransaction
    subTransaction: SystemSubTransaction
    onCategoryChange: TransactionActionHandler<string | null>
    onLabelChange: TransactionActionHandler<string[]>
    onHideChange: TransactionActionHandler<boolean>
    onCapitalizeChange: TransactionActionHandler<boolean>
    onDelete: TransactionDeleteHandler
}

export const SubTransactionRow: React.FC<SubTransactionRowProps> = ({
    transaction,
    subTransaction,
    onCategoryChange,
    onLabelChange,
    onHideChange,
    onCapitalizeChange,
    onDelete,
}) => (
    <TableRow
        sx={{
            cursor: 'pointer',
            opacity: subTransaction.hide ? 0.5 : 1,
            '&:hover': {
                backgroundColor: 'action.hover',
            },
        }}
    >
        <TableCell colSpan={2} />
        <Description description={subTransaction.description} />
        <Amount
            amount={subTransaction.amount}
            currencyCode={transaction.currencyCode}
            referenceAmount={subTransaction.referenceAmount}
            referenceCurrencyCode={transaction.referenceCurrencyCode}
        />
        <Category
            transactionId={transaction.id}
            subTransactionId={subTransaction.id}
            category={subTransaction.category}
            onCategoryChange={onCategoryChange}
        />
        <Label
            options={[]}
            transactionId={transaction.id}
            subTransactionId={subTransaction.id}
            labels={subTransaction.labels}
            onLabelChange={onLabelChange}
        />
        <ContextMenuCell
            transactionId={transaction.id}
            subTransactionId={subTransaction.id}
            isHidden={subTransaction.hide}
            isCapitalized={subTransaction.capitalized}
            onHideChange={onHideChange}
            onCapitalizeChange={onCapitalizeChange}
            onDelete={onDelete}
        />
    </TableRow>
)
