import React from 'react'
import { TableRow, TableCell } from '@mui/material'

import { Description } from './Description'
import { Category } from './Category'
import { Amount } from './Amount'
import { Label } from './Label'
import { ContextMenu } from './ContextMenu'

import { SystemSubTransaction, SystemTransaction } from '../../../types'

interface SubTransactionRowProps {
    transaction: SystemTransaction
    subTransaction: SystemSubTransaction
    onCategoryChange: (transactionId: string, category: string | null) => void
    onLabelChange: (transactionId: string, labels: string[]) => void
    onHideChange: (transactionId: string, isHidden: boolean) => void
    onCapitalizeChange: (transactionId: string, isCapitalized: boolean) => void
    onDelete: (transactionId: string) => void
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
        <Description description={subTransaction.description} comment="" />
        <Amount
            amount={subTransaction.amount}
            currencyCode={transaction.currencyCode}
            referenceAmount={subTransaction.referenceAmount}
            referenceCurrencyCode={transaction.referenceCurrencyCode}
        />
        <Category
            transactionId={subTransaction.id}
            category={subTransaction.category}
            onCategoryChange={onCategoryChange}
        />
        <Label
            options={[]}
            transactionId={subTransaction.id}
            labels={subTransaction.labels || []}
            onLabelChange={onLabelChange}
        />
        <ContextMenu
            transactionId={subTransaction.id}
            isHidden={subTransaction.hide}
            isCapitalized={subTransaction.capitalized}
            onHideChange={onHideChange}
            onCapitalizeChange={onCapitalizeChange}
            onDelete={onDelete}
        />
    </TableRow>
)
