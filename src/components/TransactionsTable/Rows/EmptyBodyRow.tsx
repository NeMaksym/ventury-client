import React from 'react'
import { TableRow, TableCell, Typography } from '@mui/material'

interface EmptyBodyRowProps {
    colSpan: number
}

export const EmptyBodyRow: React.FC<EmptyBodyRowProps> = ({ colSpan }) => (
    <TableRow>
        <TableCell colSpan={colSpan} align="center" sx={{ py: 4 }}>
            <Typography color="text.secondary">
                No transactions found.
            </Typography>
        </TableCell>
    </TableRow>
)
