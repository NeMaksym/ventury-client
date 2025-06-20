import React from 'react'
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'

interface VisibilityMenuItemProps {
    isHidden: boolean
    onClick: () => void
}

export const VisibilityMenuItem: React.FC<VisibilityMenuItemProps> = ({
    isHidden,
    onClick,
}) => {
    return (
        <MenuItem onClick={onClick}>
            <ListItemIcon>
                {isHidden ? <Visibility /> : <VisibilityOff />}
            </ListItemIcon>
            <ListItemText>{isHidden ? 'Show' : 'Hide'}</ListItemText>
        </MenuItem>
    )
}
