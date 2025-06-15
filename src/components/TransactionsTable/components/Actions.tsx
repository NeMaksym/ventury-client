import React, { useState } from 'react'
import {
    IconButton,
    Tooltip,
    Typography,
    Box,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material'
import {
    VisibilityOff,
    MonetizationOnRounded,
    DeleteOutline,
} from '@mui/icons-material'

interface ActionsProps {
    transactionId: string
    isHidden: boolean
    isCapitalized: boolean
    onHideChange: (transactionId: string, isHidden: boolean) => void
    onCapitalizeChange: (transactionId: string, isCapitalized: boolean) => void
    onDelete: (transactionId: string) => void
}

export const Actions: React.FC<ActionsProps> = ({
    transactionId,
    isHidden,
    isCapitalized,
    onHideChange,
    onCapitalizeChange,
    onDelete,
}) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const handleHideToggle = () => {
        onHideChange(transactionId, !isHidden)
    }

    const handleCapitalizeToggle = () => {
        onCapitalizeChange(transactionId, !isCapitalized)
    }

    const handleDeleteClick = () => {
        setShowDeleteDialog(true)
    }

    const handleDeleteConfirm = () => {
        onDelete(transactionId)
        setShowDeleteDialog(false)
    }

    const handleDeleteCancel = () => {
        setShowDeleteDialog(false)
    }

    return (
        <Box>
            <Box mb={1}>
                <Typography variant="subtitle2" color="text.secondary">
                    Actions
                </Typography>
            </Box>
            <Stack direction="row" spacing={1}></Stack>
            <Tooltip title={isHidden ? 'Show transaction' : 'Hide transaction'}>
                <IconButton
                    onClick={handleHideToggle}
                    size="small"
                    sx={{
                        color: isHidden ? 'primary.main' : 'text.disabled',
                    }}
                >
                    <VisibilityOff />
                </IconButton>
            </Tooltip>
            <Tooltip
                title={
                    isCapitalized ? 'Disable capitalize' : 'Enable capitalize'
                }
            >
                <IconButton
                    onClick={handleCapitalizeToggle}
                    size="small"
                    sx={{
                        color: isCapitalized ? 'primary.main' : 'text.disabled',
                    }}
                >
                    <MonetizationOnRounded />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete transaction">
                <IconButton
                    onClick={handleDeleteClick}
                    size="small"
                    sx={{
                        color: 'text.disabled',
                    }}
                >
                    <DeleteOutline />
                </IconButton>
            </Tooltip>
            <Dialog
                open={showDeleteDialog}
                onClose={handleDeleteCancel}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">
                    Delete Transaction
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure you want to delete this transaction? This
                        action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        color="error"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
