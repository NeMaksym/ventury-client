import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MonetizationOnRounded from '@mui/icons-material/MonetizationOnRounded'

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
