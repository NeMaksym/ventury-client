import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CallSplit from '@mui/icons-material/CallSplit'

interface SubTransactionMenuItemProps {
    onClick: () => void
}

export const SubTransactionMenuItem: React.FC<SubTransactionMenuItemProps> = ({
    onClick,
}) => {
    return (
        <MenuItem onClick={onClick}>
            <ListItemIcon>
                <CallSplit />
            </ListItemIcon>
            <ListItemText>Split</ListItemText>
        </MenuItem>
    )
}
