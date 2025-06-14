import React from 'react'
import { TableCell } from '@mui/material'

interface DescriptionProps {
    description: string
}

export const Description: React.FC<DescriptionProps> = ({ description }) => {
    return <TableCell>{description}</TableCell>
}
