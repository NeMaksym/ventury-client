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

interface CommentDialogProps {
    open: boolean
    comment: string | undefined
    onSubmit: (comment: string) => void
    onClose: () => void
}

export const CommentDialog: React.FC<CommentDialogProps> = ({
    open,
    comment,
    onSubmit,
    onClose,
}) => {
    const [value, setValue] = useState(comment || '')

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="comment-dialog-title"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="comment-dialog-title">Comment</DialogTitle>
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
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Add your comment here..."
                        variant="outlined"
                        autoFocus
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => onSubmit(value)}
                    color="primary"
                    variant="contained"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}
