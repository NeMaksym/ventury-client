import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Comment from '@mui/icons-material/Comment'

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
