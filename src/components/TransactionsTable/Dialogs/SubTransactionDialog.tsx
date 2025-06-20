import React, { useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
} from '@mui/material'
import { SubTransactionData } from '../types'

interface SubTransactionDialogProps {
    open: boolean
    onSubmit: (data: SubTransactionData) => void
    onCancel: () => void
}

export const SubTransactionDialog: React.FC<SubTransactionDialogProps> = ({
    open,
    onSubmit,
    onCancel,
}) => {
    const [subTransactionForm, setSubTransactionForm] = useState({
        description: '',
        amount: '',
    })

    const handleFormChange = (field: string, value: string) => {
        setSubTransactionForm((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = () => {
        const data: SubTransactionData = {
            description: subTransactionForm.description,
            amount: parseFloat(subTransactionForm.amount),
        }
        onSubmit(data)
        handleCancel()
    }

    const handleCancel = () => {
        setSubTransactionForm({
            description: '',
            amount: '',
        })
        onCancel()
    }

    const isFormValid =
        subTransactionForm.description.trim() !== '' &&
        subTransactionForm.amount !== '' &&
        !isNaN(parseFloat(subTransactionForm.amount))

    return (
        <Dialog
            open={open}
            onClose={handleCancel}
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
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    disabled={!isFormValid}
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    )
}
