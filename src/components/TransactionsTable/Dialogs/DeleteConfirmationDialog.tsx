import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material'

interface DeleteConfirmationDialogProps {
    open: boolean
    onConfirm: () => void
    onCancel: () => void
}

export const DeleteConfirmationDialog: React.FC<
    DeleteConfirmationDialogProps
> = ({ open, onConfirm, onCancel }) => {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
        >
            <DialogTitle id="delete-dialog-title">Delete</DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-dialog-description">
                    Are you sure you want to delete this transaction? This
                    action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="error" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}
