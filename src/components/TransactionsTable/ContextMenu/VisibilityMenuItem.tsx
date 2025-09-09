import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'

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
