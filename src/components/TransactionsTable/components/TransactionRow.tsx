import React from 'react'
import { TableRow } from '@mui/material'

import { Arrow } from './Arrow'
import { Date } from './Date'
import { Description } from './Description'
import { Category } from './Category'
import { Amount } from './Amount'
import { Label } from './Label'
import { ContextMenu } from './ContextMenu'

import { SystemTransaction } from '../../../types'
import { SubTransactionFormData } from '../../../hooks/useTransaction'

interface TransactionRowProps {
    transaction: SystemTransaction
    onCommentChange: (transactionId: string, comment: string) => void
    onCategoryChange: (transactionId: string, category: string | null) => void
    onLabelChange: (transactionId: string, labels: string[]) => void
    onHideChange: (transactionId: string, isHidden: boolean) => void
    onCapitalizeChange: (transactionId: string, isCapitalized: boolean) => void
    onDelete: (transactionId: string) => void
    onSubTransactionCreate: (
        transactionId: string,
        data: SubTransactionFormData
    ) => void
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
                    labels={transaction.labels || []}
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
