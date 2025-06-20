import React, { useState } from 'react'
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { CallSplit } from '@mui/icons-material'
import { SubTransactionDialog } from '../Dialogs'
import { SubTransactionData } from '../types'

interface SubTransactionMenuItemProps {
    onSubTransactionCreate: (data: SubTransactionData) => void
}

export const SubTransactionMenuItem: React.FC<SubTransactionMenuItemProps> = ({
    onSubTransactionCreate,
}) => {
    const [showSubTransactionDialog, setShowSubTransactionDialog] =
        useState(false)

    const handleClick = () => {
        setShowSubTransactionDialog(true)
    }

    const handleSubTransactionSubmit = (data: SubTransactionData) => {
        onSubTransactionCreate(data)
        setShowSubTransactionDialog(false)
    }

    const handleSubTransactionCancel = () => {
        setShowSubTransactionDialog(false)
    }

    return (
        <>
            <MenuItem onClick={handleClick}>
                <ListItemIcon>
                    <CallSplit />
                </ListItemIcon>
                <ListItemText>Sub-transaction</ListItemText>
            </MenuItem>

            <SubTransactionDialog
                open={showSubTransactionDialog}
                onSubmit={handleSubTransactionSubmit}
                onCancel={handleSubTransactionCancel}
            />
        </>
    )
}
