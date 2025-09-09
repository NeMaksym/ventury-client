import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import DialogContentText from '@mui/material/DialogContentText'

interface DeleteCategoryDialogProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
    categoryLabel: string
}

export const DeleteCategoryDialog: React.FC<DeleteCategoryDialogProps> = ({
    open,
    onClose,
    onConfirm,
    categoryLabel,
}) => {
    const handleConfirm = () => {
        onConfirm()
        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="delete-category-dialog-title"
            aria-describedby="delete-category-dialog-description"
        >
            <DialogTitle id="delete-category-dialog-title">
                Delete Category
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-category-dialog-description">
                    Delete category "{categoryLabel}"? This action cannot be
                    undone and all related transactions will become unassigned.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    color="error"
                    variant="contained"
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}
