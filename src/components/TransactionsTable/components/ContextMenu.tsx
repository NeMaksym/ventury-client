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
    TextField,
    Box,
} from '@mui/material'
import {
    MoreVert,
    VisibilityOff,
    Visibility,
    MonetizationOnRounded,
    DeleteOutline,
    CallSplit,
} from '@mui/icons-material'
import { SubTransactionFormData } from '../../../hooks/useTransaction'

interface ContextMenuProps {
    transactionId: string
    isHidden: boolean
    isCapitalized: boolean
    onHideChange: (transactionId: string, isHidden: boolean) => void
    onCapitalizeChange: (transactionId: string, isCapitalized: boolean) => void
    onDelete: (transactionId: string) => void
    onSubTransactionCreate?: (
        transactionId: string,
        data: SubTransactionFormData
    ) => void
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
    transactionId,
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
    const [subTransactionForm, setSubTransactionForm] = useState({
        description: '',
        amount: '',
    })

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

    const handleSubTransactionClick = () => {
        setShowSubTransactionDialog(true)
        handleClose()
    }

    const handleSubTransactionCancel = () => {
        setShowSubTransactionDialog(false)
        setSubTransactionForm({
            description: '',
            amount: '',
        })
    }

    const handleSubTransactionSubmit = () => {
        const data: SubTransactionFormData = {
            description: subTransactionForm.description,
            amount: parseFloat(subTransactionForm.amount),
        }

        if (onSubTransactionCreate) {
            onSubTransactionCreate(transactionId, data)
        }
        handleSubTransactionCancel()
    }

    const handleFormChange = (field: string, value: any) => {
        setSubTransactionForm((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const isFormValid =
        subTransactionForm.description.trim() !== '' &&
        subTransactionForm.amount !== '' &&
        !isNaN(parseFloat(subTransactionForm.amount))

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

            <Dialog
                open={showSubTransactionDialog}
                onClose={handleSubTransactionCancel}
                aria-labelledby="sub-transaction-dialog-title"
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle id="sub-transaction-dialog-title">
                    Create Sub-transaction
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            pt: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="Description"
                            value={subTransactionForm.description}
                            onChange={(e) =>
                                handleFormChange('description', e.target.value)
                            }
                            fullWidth
                            required
                        />

                        <TextField
                            label="Amount"
                            type="number"
                            value={subTransactionForm.amount}
                            onChange={(e) =>
                                handleFormChange('amount', e.target.value)
                            }
                            fullWidth
                            required
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleSubTransactionCancel}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubTransactionSubmit}
                        color="primary"
                        variant="contained"
                        disabled={!isFormValid}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </TableCell>
    )
}
