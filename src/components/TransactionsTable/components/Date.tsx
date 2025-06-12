import React from 'react'
import { TableCell } from '@mui/material'

interface DateProps {
    time: Date
}

export const Date: React.FC<DateProps> = ({ time }) => (
    <TableCell>{formatDate(time)}</TableCell>
)

function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}
