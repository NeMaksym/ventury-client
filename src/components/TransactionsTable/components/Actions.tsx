import React from 'react'
import { IconButton, Tooltip, Typography, Box, Stack } from '@mui/material'
import { VisibilityOff, MonetizationOnRounded } from '@mui/icons-material'

interface ActionsProps {
    transactionId: string
    isHidden: boolean
    isCapitalized: boolean
    onHideChange: (transactionId: string, isHidden: boolean) => void
    onCapitalizeChange: (transactionId: string, isCapitalized: boolean) => void
}

export const Actions: React.FC<ActionsProps> = ({
    transactionId,
    isHidden,
    isCapitalized,
    onHideChange,
    onCapitalizeChange,
}) => {
    const handleHideToggle = () => {
        onHideChange(transactionId, !isHidden)
    }

    const handleCapitalizeToggle = () => {
        onCapitalizeChange(transactionId, !isCapitalized)
    }

    return (
        <Box>
            <Box mb={1}>
                <Typography variant="subtitle2" color="text.secondary">
                    Actions
                </Typography>
            </Box>
            <Stack direction="row" spacing={1}></Stack>
            <Tooltip title={isHidden ? 'Show transaction' : 'Hide transaction'}>
                <IconButton
                    onClick={handleHideToggle}
                    size="small"
                    sx={{
                        color: isHidden ? 'primary.main' : 'text.disabled',
                    }}
                >
                    <VisibilityOff />
                </IconButton>
            </Tooltip>
            <Tooltip
                title={
                    isCapitalized ? 'Disable capitalize' : 'Enable capitalize'
                }
            >
                <IconButton
                    onClick={handleCapitalizeToggle}
                    size="small"
                    sx={{
                        color: isCapitalized ? 'primary.main' : 'text.disabled',
                    }}
                >
                    <MonetizationOnRounded />
                </IconButton>
            </Tooltip>
        </Box>
    )
}
