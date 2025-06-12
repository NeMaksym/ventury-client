import React from 'react'
import { TableCell, Typography, Tooltip } from '@mui/material'
import { formatAmount } from '../../utils'

interface AmountProps {
    amount: bigint
    referenceAmount: bigint
}

export const Amount: React.FC<AmountProps> = ({ amount, referenceAmount }) => (
    <TableCell align="right">
        <Tooltip title={`$${formatAmount(referenceAmount)}`}>
            <Typography
                component="span"
                sx={{
                    color: 'error.main',
                    fontWeight: 'bold',
                    cursor: 'help',
                }}
            >
                {formatAmount(amount)}
            </Typography>
        </Tooltip>
    </TableCell>
)
