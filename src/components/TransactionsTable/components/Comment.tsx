import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { Edit } from '@mui/icons-material'

interface CommentProps {
    transactionId: string
    comment?: string | undefined
    onCommentChange: (transactionId: string, comment: string) => void
}

export const Comment: React.FC<CommentProps> = ({
    transactionId,
    comment,
    onCommentChange,
}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [tempComment, setTempComment] = useState('')

    const handleEditComment = () => {
        setIsEditing(true)
        setTempComment(comment || '')
    }

    const handleSaveComment = () => {
        onCommentChange(transactionId, tempComment)
        setIsEditing(false)
        setTempComment('')
    }

    const handleCancelEdit = () => {
        setIsEditing(false)
        setTempComment('')
    }

    const handleTempCommentChange = (value: string) => {
        setTempComment(value)
    }

    return (
        <Box>
            <Box mb={1}>
                <Typography variant="subtitle2" color="text.secondary">
                    Comment
                </Typography>
            </Box>

            {isEditing ? (
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        size="small"
                        variant="outlined"
                        placeholder="Add a comment..."
                        value={tempComment}
                        onChange={(e) =>
                            handleTempCommentChange(e.target.value)
                        }
                        sx={{ flexGrow: 1 }}
                        autoFocus
                    />
                    <Button
                        size="small"
                        variant="contained"
                        onClick={handleSaveComment}
                    >
                        Save
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={handleCancelEdit}
                    >
                        Cancel
                    </Button>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        },
                        p: 1,
                        borderRadius: 1,
                        minHeight: 32,
                    }}
                    onClick={handleEditComment}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            flexGrow: 1,
                            color: comment ? 'text.primary' : 'text.secondary',
                            fontStyle: comment ? 'normal' : 'italic',
                        }}
                    >
                        {comment || 'Click to add comment...'}
                    </Typography>
                    <Edit
                        sx={{
                            fontSize: 16,
                            color: 'action.active',
                        }}
                    />
                </Box>
            )}
        </Box>
    )
}
