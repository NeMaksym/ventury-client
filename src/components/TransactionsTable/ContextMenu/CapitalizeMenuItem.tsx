import React from 'react'
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { MonetizationOnRounded } from '@mui/icons-material'

interface CapitalizeMenuItemProps {
    isCapitalized: boolean
    onClick: () => void
}

export const CapitalizeMenuItem: React.FC<CapitalizeMenuItemProps> = ({
    isCapitalized,
    onClick,
}) => {
    return (
        <MenuItem onClick={onClick}>
            <ListItemIcon>
                <MonetizationOnRounded />
            </ListItemIcon>
            <ListItemText>
                {isCapitalized ? 'Un-capitalize' : 'Capitalize'}
            </ListItemText>
        </MenuItem>
    )
}
