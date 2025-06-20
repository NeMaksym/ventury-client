import React from 'react'
import { MenuItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { DeleteOutline } from '@mui/icons-material'

interface DeleteMenuItemProps {
    onClick: () => void
}

export const DeleteMenuItem: React.FC<DeleteMenuItemProps> = ({ onClick }) => {
    return (
        <MenuItem onClick={onClick}>
            <ListItemIcon>
                <DeleteOutline color="error" />
            </ListItemIcon>
            <ListItemText>
                <Typography color="error">Delete</Typography>
            </ListItemText>
        </MenuItem>
    )
}
