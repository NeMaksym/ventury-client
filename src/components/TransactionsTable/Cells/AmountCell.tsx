import React from 'react'
import { TableCell, Typography, Tooltip } from '@mui/material'
import { currency, fromSmallestUnit } from '../../../utils'

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

    const typographyContent = (
        <Typography
            color="error.main"
            noWrap
            sx={{
                fontWeight: 'bold',
                cursor:
                    currencyCode !== referenceCurrencyCode ? 'help' : 'default',
            }}
        >
            {fromSmallestUnit(amount)} {currencySymbol}
        </Typography>
    )

    return (
        <TableCell align="right">
            {currencyCode !== referenceCurrencyCode ? (
                <Tooltip
                    title={`${fromSmallestUnit(
                        referenceAmount
                    )} ${referenceSymbol}`}
                >
                    {typographyContent}
                </Tooltip>
            ) : (
                typographyContent
            )}
        </TableCell>
    )
}
