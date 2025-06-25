import React from 'react'

import { TransactionRow } from './TransactionRow'
import { SubTransactionRow } from './SubTransactionRow'
import { SystemTransaction } from '../../../types'

interface TransactionGroupProps {
    transaction: SystemTransaction
}

export const TransactionGroup: React.FC<TransactionGroupProps> = ({
    transaction,
}) => (
    <React.Fragment>
        <TransactionRow transaction={transaction} />
        {transaction.subTransactions.map((subTransaction) => (
            <SubTransactionRow
                key={subTransaction.id}
                transaction={transaction}
                subTransaction={subTransaction}
            />
        ))}
    </React.Fragment>
)
