import React, { useState } from 'react'
import { TableRow, TableCell, Collapse, Stack } from '@mui/material'
import { SystemTransaction } from '../../../types'
import { Arrow } from './Arrow'
import { Date } from './Date'
import { Description } from './Description'
import { Category } from './Category'
import { Amount } from './Amount'
import { Comment } from './Comment'
import { Label } from './Label'
import { ContextMenu } from './ContextMenu'
import { SubTransactionData } from '../../../hooks/useTransaction'

interface BodyRowProps {
    transaction: SystemTransaction
    onCommentChange: (transactionId: string, comment: string) => void
    onCategoryChange: (transactionId: string, category: string | null) => void
    onLabelChange: (transactionId: string, labels: string[]) => void
    onHideChange: (transactionId: string, isHidden: boolean) => void
    onCapitalizeChange: (transactionId: string, isCapitalized: boolean) => void
    onDelete: (transactionId: string) => void
    onSubTransactionCreate: (
        transactionId: string,
        data: SubTransactionData
    ) => void
}

export const BodyRow: React.FC<BodyRowProps> = ({
    transaction,
    onCommentChange,
    onCategoryChange,
    onLabelChange,
    onHideChange,
    onCapitalizeChange,
    onDelete,
    onSubTransactionCreate,
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
                    opacity: transaction.hide ? 0.5 : 1,
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                }}
                onClick={handleToggle}
            >
                <Arrow isExpanded={isExpanded} onToggle={handleToggle} />
                <Date time={transaction.time} />
                <Description description={transaction.description} />
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
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={7}
                >
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <Stack spacing={1} sx={{ my: 2 }}>
                            <Comment
                                transactionId={transaction.id}
                                comment={transaction.comment}
                                onCommentChange={onCommentChange}
                            />
                        </Stack>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
