import React from 'react'
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { Comment } from '@mui/icons-material'

interface CommentMenuItemProps {
    onClick: () => void
}

export const CommentMenuItem: React.FC<CommentMenuItemProps> = ({
    onClick,
}) => {
    return (
        <MenuItem onClick={onClick}>
            <ListItemIcon>
                <Comment />
            </ListItemIcon>
            <ListItemText>Comment</ListItemText>
        </MenuItem>
    )
}
