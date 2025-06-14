import React, { useState } from 'react'
import { TableRow, TableCell, Collapse } from '@mui/material'
import { SystemTransaction } from '../../../types'
import { Arrow } from './Arrow'
import { Date } from './Date'
import { Category } from './Category'
import { Amount } from './Amount'
import { Comment } from './Comment'

interface BodyRowProps {
    transaction: SystemTransaction
    onCommentChange: (transactionId: string, comment: string) => void
    onCategoryChange: (transactionId: string, category: string | null) => void
}

export const BodyRow: React.FC<BodyRowProps> = ({
    transaction,
    onCommentChange,
    onCategoryChange,
}) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const handleToggle = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <React.Fragment>
            <TableRow
                sx={{
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                }}
                onClick={handleToggle}
            >
                <Arrow isExpanded={isExpanded} onToggle={handleToggle} />
                <Date time={transaction.time} />
                <TableCell>{transaction.description}</TableCell>
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
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={5}
                >
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <Comment
                            transactionId={transaction.id}
                            comment={transaction.comment}
                            onCommentChange={onCommentChange}
                        />
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
