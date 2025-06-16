import React, { useState } from 'react'
import {
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    TableCell,
    Typography,
} from '@mui/material'
import {
    MoreVert,
    VisibilityOff,
    Visibility,
    MonetizationOnRounded,
    DeleteOutline,
} from '@mui/icons-material'

interface ContextMenuProps {
    transactionId: string
    isHidden: boolean
    isCapitalized: boolean
    onHideChange: (transactionId: string, isHidden: boolean) => void
    onCapitalizeChange: (transactionId: string, isCapitalized: boolean) => void
    onDelete: (transactionId: string) => void
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
    transactionId,
    isHidden,
    isCapitalized,
    onHideChange,
    onCapitalizeChange,
    onDelete,
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleHideToggle = () => {
        onHideChange(transactionId, !isHidden)
        handleClose()
    }

    const handleCapitalizeToggle = () => {
        onCapitalizeChange(transactionId, !isCapitalized)
        handleClose()
    }

    const handleDeleteClick = () => {
        setShowDeleteDialog(true)
        handleClose()
    }

    const handleDeleteConfirm = () => {
        onDelete(transactionId)
        setShowDeleteDialog(false)
    }

    const handleDeleteCancel = () => {
        setShowDeleteDialog(false)
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
                    <ListItemText>Capitalize</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDeleteClick}>
                    <ListItemIcon>
                        <DeleteOutline color="error" />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography color="error">Delete</Typography>
                    </ListItemText>
                </MenuItem>
            </Menu>
            <Dialog
                open={showDeleteDialog}
                onClose={handleDeleteCancel}
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
        </TableCell>
    )
}
