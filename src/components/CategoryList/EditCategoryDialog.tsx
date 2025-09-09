import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

interface EditCategoryDialogProps {
    open: boolean
    onClose: () => void
    onSave: (label: string) => void
    initialLabel: string
}

export const EditCategoryDialog: React.FC<EditCategoryDialogProps> = ({
    open,
    onClose,
    onSave,
    initialLabel,
}) => {
    const [label, setLabel] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (open) {
            setLabel(initialLabel)
            setError('')
        }
    }, [open, initialLabel])

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

    const handleSave = () => {
        if (validateLabel(label)) {
            onSave(label.trim())
            onClose()
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSave()
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    fullWidth
                    variant="outlined"
                    value={label}
                    onChange={(e) => handleLabelChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    error={!!error}
                    helperText={error}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}
