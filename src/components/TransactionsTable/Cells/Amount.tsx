import React from 'react'
import { TableCell, Typography, Tooltip } from '@mui/material'
import { currency, fromSmallestUnit } from '../../../utils'

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

    const amountValue = fromSmallestUnit(amount).toFixed(2)
    const referenceAmountValue = fromSmallestUnit(referenceAmount).toFixed(2)

    return (
        <TableCell align="right">
            <Tooltip title={`${referenceAmountValue} ${referenceSymbol}`}>
                <Typography
                    color="error.main"
                    noWrap
                    sx={{
                        fontWeight: 'bold',
                        cursor: 'help',
                    }}
                >
                    {-amountValue} {currencySymbol}
                </Typography>
            </Tooltip>
        </TableCell>
    )
}
