import React, { useState } from 'react'
import { IconButton, TableCell } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { useTransactionHandlers } from '../context'
import { ContextMenu } from '../ContextMenu'
import {
    CommentDialog,
    DeleteConfirmationDialog,
    SubTransactionDialog,
} from '../Dialogs'

interface ContextMenuCellProps {
    transactionId: string
    subTransactionId?: string
    comment: string
    isHidden: boolean
    isCapitalized: boolean
    maxSubTransactionAmount?: bigint
}

export const ContextMenuCell: React.FC<ContextMenuCellProps> = ({
    transactionId,
    subTransactionId,
    comment,
    isHidden,
    isCapitalized,
    maxSubTransactionAmount,
}) => {
    const {
        onCommentChange,
        onHideChange,
        onCapitalizeChange,
        onDelete,
        onSubTransactionCreate,
    } = useTransactionHandlers()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [commentDialogOpen, setCommentDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [subTransactionDialogOpen, setSubTransactionDialogOpen] =
        useState(false)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }

    const closeContextMenu = () => {
        setAnchorEl(null)
    }

    return (
        <TableCell onClick={(e) => e.stopPropagation()}>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ color: 'text.secondary' }}
            >
                <MoreVert />
            </IconButton>

            <ContextMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeContextMenu}
                isHidden={isHidden}
                isCapitalized={isCapitalized}
                onHideClick={() => {
                    onHideChange(transactionId, !isHidden, subTransactionId)
                    closeContextMenu()
                }}
                onCapitalizeClick={() => {
                    onCapitalizeChange(
                        transactionId,
                        !isCapitalized,
                        subTransactionId
                    )
                    closeContextMenu()
                }}
                onCommentClick={() => {
                    setCommentDialogOpen(true)
                    closeContextMenu()
                }}
                onDeleteClick={() => {
                    setDeleteDialogOpen(true)
                    closeContextMenu()
                }}
                {...(maxSubTransactionAmount && {
                    onSubTransactionClick: () => {
                        setSubTransactionDialogOpen(true)
                        closeContextMenu()
                    },
                })}
            />

            <CommentDialog
                open={commentDialogOpen}
                comment={comment}
                onSubmit={(comment: string) => {
                    onCommentChange(transactionId, comment, subTransactionId)
                    setCommentDialogOpen(false)
                }}
                onClose={() => setCommentDialogOpen(false)}
            />

            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onConfirm={() => {
                    onDelete(transactionId, subTransactionId)
                    setDeleteDialogOpen(false)
                }}
                onCancel={() => setDeleteDialogOpen(false)}
            />

            {maxSubTransactionAmount && (
                <SubTransactionDialog
                    open={subTransactionDialogOpen}
                    maxAmount={maxSubTransactionAmount}
                    onSubmit={(amount: number) => {
                        onSubTransactionCreate(transactionId, amount)
                        setSubTransactionDialogOpen(false)
                    }}
                    onCancel={() => setSubTransactionDialogOpen(false)}
                />
            )}
        </TableCell>
    )
}
