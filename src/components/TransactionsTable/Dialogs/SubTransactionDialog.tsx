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

interface SubTransactionDialogProps {
    open: boolean
    onSubmit: (amount: number) => void
    onCancel: () => void
}

export const SubTransactionDialog: React.FC<SubTransactionDialogProps> = ({
    open,
    onSubmit,
    onCancel,
}) => {
    const [amount, setAmount] = useState<string>('')

    const handleFormChange = (field: string, value: string) => setAmount(value)

    const handleSubmit = () => {
        onSubmit(parseFloat(amount))
        handleCancel()
    }

    const handleCancel = () => {
        setAmount('')
        onCancel()
    }

    const isFormValid = amount !== '' && !isNaN(parseFloat(amount))

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
                        label="Amount"
                        type="number"
                        value={amount}
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
