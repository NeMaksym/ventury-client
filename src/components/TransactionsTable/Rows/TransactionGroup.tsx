import React, { useState } from 'react'

import { TransactionRow } from './TransactionRow'
import { SubTransactionRow } from './SubTransactionRow'
import { SystemTransaction } from '../../../types'
import { TransactionsTableProps } from '../TransactionsTable'

interface TransactionGroupProps
    extends Pick<TransactionsTableProps, 'handlers'> {
    transaction: SystemTransaction
}

export const TransactionGroup: React.FC<TransactionGroupProps> = ({
    transaction,
    handlers,
}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <React.Fragment>
            <TransactionRow
                transaction={transaction}
                handlers={handlers}
                isExpanded={isExpanded}
                onClick={toggleExpanded}
            />
            {isExpanded &&
                transaction.subTransactions.map((subTransaction) => (
                    <SubTransactionRow
                        key={subTransaction.id}
                        transaction={transaction}
                        subTransaction={subTransaction}
                        handlers={handlers}
                    />
                ))}
        </React.Fragment>
    )
}
