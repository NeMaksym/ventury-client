import React from 'react'
import { TableCell } from '@mui/material'

interface DateProps {
    time: Date
}

export const Date: React.FC<DateProps> = ({ time }) => (
    <TableCell>{formatDate(time)}</TableCell>
)

const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

function formatDate(date: Date): string {
    const day = date.getDate()

    const month = monthNames[date.getMonth()]
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${day} ${month} ${hours}:${minutes}`
}
