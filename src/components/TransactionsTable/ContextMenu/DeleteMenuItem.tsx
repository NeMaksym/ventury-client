import React, { useState } from 'react'
import { MenuItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { DeleteOutline } from '@mui/icons-material'
import { DeleteConfirmationDialog } from '../Dialogs'

interface DeleteMenuItemProps {
    onClick: () => void
}

export const DeleteMenuItem: React.FC<DeleteMenuItemProps> = ({ onClick }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const handleClick = () => {
        setShowDeleteDialog(true)
    }

    const handleDeleteConfirm = () => {
        onClick()
        setShowDeleteDialog(false)
    }

    const handleDeleteCancel = () => {
        setShowDeleteDialog(false)
    }

    return (
        <>
            <MenuItem onClick={handleClick}>
                <ListItemIcon>
                    <DeleteOutline color="error" />
                </ListItemIcon>
                <ListItemText>
                    <Typography color="error">Delete</Typography>
                </ListItemText>
            </MenuItem>

            <DeleteConfirmationDialog
                open={showDeleteDialog}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />
        </>
    )
}
