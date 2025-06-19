import React from 'react'
import { TableCell, IconButton } from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

interface ArrowProps {
    isExpanded: boolean
    onToggle: () => void
}

export const Arrow: React.FC<ArrowProps> = ({ isExpanded, onToggle }) => (
    <TableCell>
        <IconButton size="small" onClick={onToggle}>
            {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
    </TableCell>
)
