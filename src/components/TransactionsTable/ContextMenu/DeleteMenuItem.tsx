import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import DeleteOutline from '@mui/icons-material/DeleteOutline'

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
