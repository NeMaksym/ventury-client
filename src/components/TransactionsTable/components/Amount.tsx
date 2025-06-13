import React from 'react'
import { TableCell, Typography, Tooltip } from '@mui/material'
import { currency, formatAmount } from '../../../utils'

interface AmountProps {
    amount: bigint
    currencyCode: number
    referenceAmount: bigint
    referenceCurrencyCode: number
}

export const Amount: React.FC<AmountProps> = ({
    amount,
    currencyCode,
    referenceAmount,
    referenceCurrencyCode,
}) => {
    const currencySymbol = currency.getSymbolByNumCode(currencyCode)
    const referenceSymbol = currency.getSymbolByNumCode(referenceCurrencyCode)

    return (
        <TableCell align="right">
            <Tooltip
                title={`${formatAmount(referenceAmount)} ${referenceSymbol}`}
            >
                <Typography
                    component="span"
                    sx={{
                        color: 'error.main',
                        fontWeight: 'bold',
                        cursor: 'help',
                    }}
                >
                    {-formatAmount(amount)} {currencySymbol}
                </Typography>
            </Tooltip>
        </TableCell>
    )
}
