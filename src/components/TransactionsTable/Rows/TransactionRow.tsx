import React from 'react'
import { TableRow } from '@mui/material'

import {
    DateCell,
    DescriptionCell,
    CategoryCell,
    AmountCell,
    LabelCell,
    ContextMenuCell,
} from '../Cells'
import { TableTransaction } from '../types'

interface TransactionRowProps {
    data: TableTransaction
}

export const TransactionBodyRow: React.FC<TransactionRowProps> = ({ data }) => (
    <TableRow sx={{ opacity: data.hide ? 0.5 : 1 }}>
        <DateCell time={data.time} />
        <DescriptionCell
            description={data.description}
            comment={data.comment}
        />
        <AmountCell
            amount={data.amount}
            currencyCode={data.currencyCode}
            referenceAmount={data.referenceAmount}
            referenceCurrencyCode={data.referenceCurrencyCode}
        />
        <CategoryCell
            transactionId={data.transactionId}
            category={data.category}
        />
        <LabelCell transactionId={data.transactionId} labels={data.labels} />
        <ContextMenuCell
            transactionId={data.transactionId}
            comment={data.comment}
            isHidden={data.hide}
            isCapitalized={data.capitalized}
            maxSubTransactionAmount={data.amount}
        />
    </TableRow>
)
