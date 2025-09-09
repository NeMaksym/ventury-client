import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

interface AddCategoryDialogProps {
    open: boolean
    onClose: () => void
    onAdd: (label: string) => void
}

export const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({
    open,
    onClose,
    onAdd,
}) => {
    const [label, setLabel] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (open) {
            setLabel('')
            setError('')
        }
    }, [open])

    const validateLabel = (value: string): boolean => {
        const trimmedValue = value.trim()
        if (trimmedValue.length === 0) {
            setError('Category name is required')
            return false
        }
        setError('')
        return true
    }

    const handleLabelChange = (value: string) => {
        setLabel(value)
        if (error && value.trim().length > 0) {
            setError('')
        }
    }

    const handleAdd = () => {
        if (validateLabel(label)) {
            onAdd(label.trim())
            onClose()
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAdd()
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add Category</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    fullWidth
                    variant="outlined"
                    value={label}
                    onChange={(e) => handleLabelChange(e.target.value)}
                    onKeyDown={handleKeyPress}
                    error={!!error}
                    helperText={error}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleAdd} variant="contained">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}
