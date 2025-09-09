import React from 'react'
import Typography from '@mui/material/Typography'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

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
