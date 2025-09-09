import React from 'react'
import Typography from '@mui/material/Typography'
import TableCell from '@mui/material/TableCell'
import Tooltip from '@mui/material/Tooltip'

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
            {fromSmallestUnit(amount).toLocaleString('fr-FR', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            })}{' '}
            {currencySymbol}
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
