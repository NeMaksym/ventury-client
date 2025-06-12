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
import { KeyboardArrowDown, KeyboardArrowUp, Edit } from '@mui/icons-material'

import { SystemTransaction } from '../../types'

export interface TransactionsTableProps {
    transactions: SystemTransaction[]
    onCommentChange: (transactionId: string, comment: string) => void
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
    transactions,
    onCommentChange,
}) => {
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
    const [editingComments, setEditingComments] = useState<Set<string>>(
        new Set()
    )
    const [tempComments, setTempComments] = useState<Record<string, string>>({})

    const handleRowToggle = (transactionId: string) => {
        const newExpandedRows = new Set(expandedRows)
        if (newExpandedRows.has(transactionId)) {
            newExpandedRows.delete(transactionId)
        } else {
            newExpandedRows.add(transactionId)
        }
        setExpandedRows(newExpandedRows)
    }

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
                                onClick={() => handleRowToggle(transaction.id)}
                            >
                                <TableCell>
                                    <IconButton size="small">
                                        {expandedRows.has(transaction.id) ? (
                                            <KeyboardArrowUp />
                                        ) : (
                                            <KeyboardArrowDown />
                                        )}
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    {formatDate(transaction.time)}
                                </TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>
                                    {transaction.category || '-'}
                                </TableCell>
                                <TableCell align="right">
                                    <Tooltip
                                        title={`$${formatAmount(
                                            transaction.referenceAmount
                                        )}`}
                                    >
                                        <Typography
                                            component="span"
                                            sx={{
                                                color: 'error.main',
                                                fontWeight: 'bold',
                                                cursor: 'help',
                                            }}
                                        >
                                            {formatAmount(transaction.amount)}
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    style={{ paddingBottom: 0, paddingTop: 0 }}
                                    colSpan={5}
                                >
                                    <Collapse
                                        in={expandedRows.has(transaction.id)}
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

function formatAmount(amount: bigint): string {
    return (Number(amount) / 100).toFixed(2)
}

function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}
