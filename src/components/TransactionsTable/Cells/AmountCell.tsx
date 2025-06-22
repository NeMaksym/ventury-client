import React from 'react'
import { TableCell, Typography, Tooltip } from '@mui/material'
import { currency } from '../../../utils'

interface AmountCellProps {
    amount: number
    currencyCode: number
    referenceAmount: number
    referenceCurrencyCode: number
}

export const AmountCell: React.FC<AmountCellProps> = ({
    amount,
    currencyCode,
    referenceAmount,
    referenceCurrencyCode,
}) => {
    const currencySymbol = currency.getSymbolByNumCode(currencyCode)
    const referenceSymbol = currency.getSymbolByNumCode(referenceCurrencyCode)

    return (
        <TableCell align="right">
            <Tooltip title={`${referenceAmount} ${referenceSymbol}`}>
                <Typography
                    color="error.main"
                    noWrap
                    sx={{
                        fontWeight: 'bold',
                        cursor: 'help',
                    }}
                >
                    {amount} {currencySymbol}
                </Typography>
            </Tooltip>
        </TableCell>
    )
}
