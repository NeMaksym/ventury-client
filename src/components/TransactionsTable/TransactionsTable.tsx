import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Tooltip,
    IconButton,
    Collapse,
    Box,
    TextField,
    Button,
} from '@mui/material'
import { Edit } from '@mui/icons-material'

import { SystemTransaction } from '../../types'
import { Date } from './Date'
import { Arrow } from './Arrow'
import { Category } from './Category'
import { Amount } from './Amount'
import { useExpandedRows } from './hooks/useExpandedRows'

export interface TransactionsTableProps {
    transactions: SystemTransaction[]
    onCommentChange: (transactionId: string, comment: string) => void
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
    transactions,
    onCommentChange,
}) => {
    const { isExpanded, toggleRow } = useExpandedRows()
    const [editingComments, setEditingComments] = useState<Set<string>>(
        new Set()
    )
    const [tempComments, setTempComments] = useState<Record<string, string>>({})

    const handleEditComment = (transactionId: string) => {
        const newEditingComments = new Set(editingComments)
        newEditingComments.add(transactionId)
        setEditingComments(newEditingComments)
        setTempComments((prev) => ({
            ...prev,
            [transactionId]:
                transactions.find((t) => t.id === transactionId)?.comment || '',
        }))
    }

    const handleSaveComment = (transactionId: string) => {
        const comment = tempComments[transactionId] || ''
        onCommentChange(transactionId, comment)
        const newEditingComments = new Set(editingComments)
        newEditingComments.delete(transactionId)
        setEditingComments(newEditingComments)
        setTempComments((prev) => {
            const newTemp = { ...prev }
            delete newTemp[transactionId]
            return newTemp
        })
    }

    const handleCancelEdit = (transactionId: string) => {
        const newEditingComments = new Set(editingComments)
        newEditingComments.delete(transactionId)
        setEditingComments(newEditingComments)
        setTempComments((prev) => {
            const newTemp = { ...prev }
            delete newTemp[transactionId]
            return newTemp
        })
    }

    const handleTempCommentChange = (
        transactionId: string,
        comment: string
    ) => {
        setTempComments((prev) => ({
            ...prev,
            [transactionId]: comment,
        }))
    }

    if (transactions.length === 0) {
        return <Typography>No expense transactions found.</Typography>
    }

    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell align="right">Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction) => (
                        <React.Fragment key={transaction.id}>
                            <TableRow
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    },
                                }}
                                onClick={() => toggleRow(transaction.id)}
                            >
                                <Arrow
                                    isExpanded={isExpanded(transaction.id)}
                                    onToggle={() => toggleRow(transaction.id)}
                                />
                                <Date time={transaction.time} />
                                <TableCell>{transaction.description}</TableCell>
                                <Category category={transaction.category} />
                                <Amount
                                    amount={transaction.amount}
                                    referenceAmount={
                                        transaction.referenceAmount
                                    }
                                />
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    style={{ paddingBottom: 0, paddingTop: 0 }}
                                    colSpan={5}
                                >
                                    <Collapse
                                        in={isExpanded(transaction.id)}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <Box sx={{ margin: 1, py: 1 }}>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    mb: 1,
                                                    color: 'text.secondary',
                                                }}
                                            >
                                                Comment
                                            </Typography>
                                            {editingComments.has(
                                                transaction.id
                                            ) ? (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        gap: 1,
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <TextField
                                                        size="small"
                                                        variant="outlined"
                                                        placeholder="Add a comment..."
                                                        value={
                                                            tempComments[
                                                                transaction.id
                                                            ] || ''
                                                        }
                                                        onChange={(e) =>
                                                            handleTempCommentChange(
                                                                transaction.id,
                                                                e.target.value
                                                            )
                                                        }
                                                        sx={{ flexGrow: 1 }}
                                                        autoFocus
                                                    />
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        onClick={() =>
                                                            handleSaveComment(
                                                                transaction.id
                                                            )
                                                        }
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        onClick={() =>
                                                            handleCancelEdit(
                                                                transaction.id
                                                            )
                                                        }
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Box>
                                            ) : (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            backgroundColor:
                                                                'action.hover',
                                                        },
                                                        p: 1,
                                                        borderRadius: 1,
                                                        minHeight: 32,
                                                    }}
                                                    onClick={() =>
                                                        handleEditComment(
                                                            transaction.id
                                                        )
                                                    }
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            flexGrow: 1,
                                                            color: transaction.comment
                                                                ? 'text.primary'
                                                                : 'text.secondary',
                                                            fontStyle:
                                                                transaction.comment
                                                                    ? 'normal'
                                                                    : 'italic',
                                                        }}
                                                    >
                                                        {transaction.comment ||
                                                            'Click to add comment...'}
                                                    </Typography>
                                                    <Edit
                                                        sx={{
                                                            fontSize: 16,
                                                            color: 'action.active',
                                                        }}
                                                    />
                                                </Box>
                                            )}
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
