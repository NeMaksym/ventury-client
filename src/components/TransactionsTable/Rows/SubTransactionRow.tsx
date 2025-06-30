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
import { TableSubTransaction } from '../types'

interface SubTransactionRowProps {
    data: TableSubTransaction
}

export const SubTransactionBodyRow: React.FC<SubTransactionRowProps> = ({
    data,
}) => (
    <TableRow
        sx={{
            opacity: data.hide ? 0.5 : 1,
            backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.02)'
                    : 'rgba(0, 0, 0, 0.02)',
            borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`,
        }}
    >
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
            subTransactionId={data.subTransactionId}
            category={data.category}
        />
        <LabelCell
            transactionId={data.transactionId}
            subTransactionId={data.subTransactionId}
            labels={data.labels}
        />
        <ContextMenuCell
            transactionId={data.transactionId}
            subTransactionId={data.subTransactionId}
            comment={data.comment}
            isHidden={data.hide}
            isCapitalized={data.capitalized}
        />
    </TableRow>
)
