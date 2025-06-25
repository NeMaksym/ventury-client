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
import { fromSmallestUnit } from '../../../utils'
import { SystemTransaction } from '../../../types'

interface TransactionRowProps {
    transaction: SystemTransaction
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
    transaction,
}) => {
    const hasSubTransactions = transaction.subTransactions.length > 0

    const subTransactionsSum = transaction.subTransactions.reduce(
        (sum, sub) => sum + sub.amount,
        0n
    )
    const subTransactionsRefSum = transaction.subTransactions.reduce(
        (sum, sub) => sum + sub.referenceAmount,
        0n
    )
    const transactionAmount = transaction.amount - subTransactionsSum
    const transactionRefAmount =
        transaction.referenceAmount - subTransactionsRefSum

    return (
        <>
            <TableRow
                sx={{
                    cursor: hasSubTransactions ? 'pointer' : 'default',
                    opacity: transaction.hide ? 0.5 : 1,
                }}
            >
                <DateCell time={transaction.time} />
                <DescriptionCell
                    description={transaction.description}
                    comment={transaction.comment}
                />
                <AmountCell
                    amount={-fromSmallestUnit(transactionAmount)}
                    currencyCode={transaction.currencyCode}
                    referenceAmount={fromSmallestUnit(transactionRefAmount)}
                    referenceCurrencyCode={transaction.referenceCurrencyCode}
                />
                <CategoryCell
                    transactionId={transaction.id}
                    category={transaction.category}
                />
                <LabelCell
                    options={[]}
                    transactionId={transaction.id}
                    labels={transaction.labels}
                />
                <ContextMenuCell
                    transactionId={transaction.id}
                    comment={transaction.comment}
                    isHidden={transaction.hide}
                    isCapitalized={transaction.capitalized}
                    maxSubTransactionAmount={
                        -fromSmallestUnit(transactionAmount)
                    }
                />
            </TableRow>
        </>
    )
}
