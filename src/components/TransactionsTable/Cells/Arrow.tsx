import React from 'react'
import { TableCell, IconButton } from '@mui/material'
import { KeyboardArrowDown } from '@mui/icons-material'

interface ArrowProps {
    isExpanded: boolean
    onToggle: () => void
}

export const Arrow: React.FC<ArrowProps> = ({ isExpanded, onToggle }) => (
    <TableCell>
        <IconButton size="small" onClick={onToggle}>
            <KeyboardArrowDown
                sx={{
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out',
                }}
            />
        </IconButton>
    </TableCell>
)
