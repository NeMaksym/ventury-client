import React from 'react'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

import { MonoAPITransaction } from '../types'

interface TransactionsListProps {
    transactions: MonoAPITransaction[]
}

function formatMinorUnitsToMajor(minorUnits: number): string {
    const majorUnits = minorUnits / 100
    return majorUnits.toFixed(2)
}

function formatUnixSecondsToDateString(unixSeconds: number): string {
    const date = new Date(unixSeconds * 1000)
    return date.toLocaleDateString()
}

export const TransactionsList: React.FC<TransactionsListProps> = ({
    transactions,
}) => {
    return (
        <>
            <Typography variant="h6" component="h3" gutterBottom>
                Total: {transactions.length}
            </Typography>
            <List dense>
                {transactions.map((transaction) => {
                    const primaryText =
                        transaction.description || '(no description)'
                    const isIncome = transaction.amount > 0
                    const amountText = `${
                        isIncome ? '+' : ''
                    }${formatMinorUnitsToMajor(transaction.amount)}`

                    return (
                        <ListItem key={transaction.id} divider>
                            <ListItemText
                                primary={primaryText}
                                secondary={
                                    <>
                                        {formatUnixSecondsToDateString(
                                            transaction.time
                                        )}{' '}
                                        •{' '}
                                        <Typography
                                            component="span"
                                            sx={{
                                                color: isIncome
                                                    ? 'success.main'
                                                    : 'error.main',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {amountText}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    )
                })}
            </List>
        </>
    )
}
