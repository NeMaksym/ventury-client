import React from 'react'
import { TableRow } from '@mui/material'

import {
    DescriptionCell,
    CategoryCell,
    AmountCell,
    LabelCell,
    ContextMenuCell,
    DateCell,
} from '../Cells'
import { fromSmallestUnit } from '../../../utils'
import { SystemTransaction, SystemSubTransaction } from '../../../types'

interface SubTransactionRowProps {
    transaction: SystemTransaction
    subTransaction: SystemSubTransaction
}

export const SubTransactionRow: React.FC<SubTransactionRowProps> = ({
    transaction,
    subTransaction,
}) => (
    <TableRow
        sx={{
            opacity: subTransaction.hide ? 0.5 : 1,
            backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.02)'
                    : 'rgba(0, 0, 0, 0.02)',
            borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`,
        }}
    >
        <DateCell time={transaction.time} />
        <DescriptionCell
            description={transaction.description}
            comment={subTransaction.comment}
        />
        <AmountCell
            amount={-fromSmallestUnit(subTransaction.amount)}
            currencyCode={transaction.currencyCode}
            referenceAmount={fromSmallestUnit(subTransaction.referenceAmount)}
            referenceCurrencyCode={transaction.referenceCurrencyCode}
        />
        <CategoryCell
            transactionId={transaction.id}
            subTransactionId={subTransaction.id}
            category={subTransaction.category}
        />
        <LabelCell
            options={[]}
            transactionId={transaction.id}
            subTransactionId={subTransaction.id}
            labels={subTransaction.labels}
        />
        <ContextMenuCell
            transactionId={transaction.id}
            subTransactionId={subTransaction.id}
            comment={subTransaction.comment}
            isHidden={subTransaction.hide}
            isCapitalized={subTransaction.capitalized}
        />
    </TableRow>
)
