import React, { useState } from 'react'
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { Comment } from '@mui/icons-material'
import { CommentDialog } from '../Dialogs'

interface CommentMenuItemProps {
    comment: string | undefined
    onCommentSave: (comment: string) => void
}

export const CommentMenuItem: React.FC<CommentMenuItemProps> = ({
    comment,
    onCommentSave,
}) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleClick = () => {
        setDialogOpen(true)
    }

    return (
        <>
            <MenuItem onClick={handleClick}>
                <ListItemIcon>
                    <Comment />
                </ListItemIcon>
                <ListItemText>Comment</ListItemText>
            </MenuItem>

            <CommentDialog
                open={dialogOpen}
                comment={comment}
                onSubmit={(comment: string) => {
                    onCommentSave(comment)
                }}
                onClose={() => setDialogOpen(false)}
            />
        </>
    )
}
