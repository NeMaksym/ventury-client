import React from 'react'
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { CallSplit } from '@mui/icons-material'

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
            <ListItemText>Sub-transaction</ListItemText>
        </MenuItem>
    )
}
