import React, { useState } from 'react'

import { TransactionRow } from './TransactionRow'
import { SubTransactionRow } from './SubTransactionRow'
import {
    TransactionActionHandler,
    TransactionDeleteHandler,
    SubTransactionCreateHandler,
} from '../types'
import { SystemTransaction } from '../../../types'

interface TransactionGroupProps {
    transaction: SystemTransaction
    onCommentChange: TransactionActionHandler<string>
    onCategoryChange: TransactionActionHandler<string | null>
    onLabelChange: TransactionActionHandler<string[]>
    onHideChange: TransactionActionHandler<boolean>
    onCapitalizeChange: TransactionActionHandler<boolean>
    onDelete: TransactionDeleteHandler
    onSubTransactionCreate: SubTransactionCreateHandler
}

export const TransactionGroup: React.FC<TransactionGroupProps> = ({
    transaction,
    onCommentChange,
    onCategoryChange,
    onLabelChange,
    onHideChange,
    onCapitalizeChange,
    onDelete,
    onSubTransactionCreate,
}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <React.Fragment>
            <TransactionRow
                transaction={transaction}
                onCommentChange={onCommentChange}
                onCategoryChange={onCategoryChange}
                onLabelChange={onLabelChange}
                onHideChange={onHideChange}
                onCapitalizeChange={onCapitalizeChange}
                onDelete={onDelete}
                onSubTransactionCreate={onSubTransactionCreate}
                isExpanded={isExpanded}
                onClick={toggleExpanded}
            />
            {isExpanded &&
                transaction.subTransactions.map((subTransaction) => (
                    <SubTransactionRow
                        key={subTransaction.id}
                        transaction={transaction}
                        subTransaction={subTransaction}
                        onCommentChange={onCommentChange}
                        onCategoryChange={onCategoryChange}
                        onLabelChange={onLabelChange}
                        onHideChange={onHideChange}
                        onCapitalizeChange={onCapitalizeChange}
                        onDelete={onDelete}
                    />
                ))}
        </React.Fragment>
    )
}
