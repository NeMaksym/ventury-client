import React, { useState } from 'react'
import {
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    TableCell,
    Typography,
} from '@mui/material'
import {
    MoreVert,
    VisibilityOff,
    Visibility,
    MonetizationOnRounded,
    DeleteOutline,
    CallSplit,
} from '@mui/icons-material'
import {
    SubTransactionData,
    SubTransactionCreateHandler,
    TransactionActionHandler,
    TransactionDeleteHandler,
} from '../types'
import { DeleteConfirmationDialog, SubTransactionDialog } from '../Dialogs'

interface ContextMenuProps {
    transactionId: string
    subTransactionId?: string
    isHidden: boolean
    isCapitalized: boolean
    onHideChange: TransactionActionHandler<boolean>
    onCapitalizeChange: TransactionActionHandler<boolean>
    onDelete: TransactionDeleteHandler
    onSubTransactionCreate?: SubTransactionCreateHandler
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
    transactionId,
    subTransactionId,
    isHidden,
    isCapitalized,
    onHideChange,
    onCapitalizeChange,
    onDelete,
    onSubTransactionCreate,
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showSubTransactionDialog, setShowSubTransactionDialog] =
        useState(false)

    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleHideToggle = () => {
        onHideChange(transactionId, !isHidden, subTransactionId)
        handleClose()
    }

    const handleCapitalizeToggle = () => {
        onCapitalizeChange(transactionId, !isCapitalized, subTransactionId)
        handleClose()
    }

    const handleDeleteClick = () => {
        setShowDeleteDialog(true)
        handleClose()
    }

    const handleDeleteConfirm = () => {
        onDelete(transactionId, subTransactionId)
        setShowDeleteDialog(false)
    }

    const handleDeleteCancel = () => {
        setShowDeleteDialog(false)
    }

    const handleSubTransactionClick = () => {
        setShowSubTransactionDialog(true)
        handleClose()
    }

    const handleSubTransactionCancel = () => {
        setShowSubTransactionDialog(false)
    }

    const handleSubTransactionSubmit = (data: SubTransactionData) => {
        if (onSubTransactionCreate) {
            onSubTransactionCreate(transactionId, data)
        }
        setShowSubTransactionDialog(false)
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
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleHideToggle}>
                    <ListItemIcon>
                        {isHidden ? <Visibility /> : <VisibilityOff />}
                    </ListItemIcon>
                    <ListItemText>{isHidden ? 'Show' : 'Hide'}</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleCapitalizeToggle}>
                    <ListItemIcon>
                        <MonetizationOnRounded />
                    </ListItemIcon>
                    <ListItemText>
                        {isCapitalized ? 'Un-capitalize' : 'Capitalize'}
                    </ListItemText>
                </MenuItem>

                {onSubTransactionCreate && (
                    <MenuItem onClick={handleSubTransactionClick}>
                        <ListItemIcon>
                            <CallSplit />
                        </ListItemIcon>
                        <ListItemText>Sub-transaction</ListItemText>
                    </MenuItem>
                )}

                <MenuItem onClick={handleDeleteClick}>
                    <ListItemIcon>
                        <DeleteOutline color="error" />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography color="error">Delete</Typography>
                    </ListItemText>
                </MenuItem>
            </Menu>

            <DeleteConfirmationDialog
                open={showDeleteDialog}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />

            <SubTransactionDialog
                open={showSubTransactionDialog}
                onSubmit={handleSubTransactionSubmit}
                onCancel={handleSubTransactionCancel}
            />
        </TableCell>
    )
}
