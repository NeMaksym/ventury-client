import React from 'react'
import { TableCell, TableRow, Typography } from '@mui/material'

import { SystemSubTransaction, SystemTransaction } from '../../../types'
import {
    DescriptionCell,
    CategoryCell,
    AmountCell,
    LabelCell,
    ContextMenuCell,
} from '../Cells'
import { fromSmallestUnit } from '../../../utils'
import { TransactionsTableProps } from '../TransactionsTable'

interface SubTransactionRowProps
    extends Pick<TransactionsTableProps, 'handlers'> {
    transaction: SystemTransaction
    subTransaction: SystemSubTransaction
}

export const SubTransactionRow: React.FC<SubTransactionRowProps> = ({
    transaction,
    subTransaction,
    handlers,
}) => {
    return (
        <TableRow
            sx={{
                opacity: subTransaction.hide ? 0.5 : 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.02)'
                        : 'rgba(0, 0, 0, 0.02)',
                borderLeft: (theme) =>
                    `3px solid ${theme.palette.primary.main}`,
            }}
            hover
        >
            <TableCell />
            <TableCell align="center">
                <Typography variant="body2">└──</Typography>
            </TableCell>

            <DescriptionCell
                description={transaction.description}
                comment={subTransaction.comment}
            />
            <AmountCell
                amount={-fromSmallestUnit(subTransaction.amount)}
                currencyCode={transaction.currencyCode}
                referenceAmount={fromSmallestUnit(
                    subTransaction.referenceAmount
                )}
                referenceCurrencyCode={transaction.referenceCurrencyCode}
            />
            <CategoryCell
                transactionId={transaction.id}
                subTransactionId={subTransaction.id}
                category={subTransaction.category}
                onCategoryChange={handlers.onCategoryChange}
            />
            <LabelCell
                options={[]}
                transactionId={transaction.id}
                subTransactionId={subTransaction.id}
                labels={subTransaction.labels}
                onLabelChange={handlers.onLabelChange}
            />
            <ContextMenuCell
                transactionId={transaction.id}
                subTransactionId={subTransaction.id}
                comment={subTransaction.comment}
                isHidden={subTransaction.hide}
                isCapitalized={subTransaction.capitalized}
                onCommentChange={handlers.onCommentChange}
                onHideChange={handlers.onHideChange}
                onCapitalizeChange={handlers.onCapitalizeChange}
                onDelete={handlers.onDelete}
            />
        </TableRow>
    )
}
