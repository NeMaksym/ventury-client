import React from 'react'
import { TableCell } from '@mui/material'

interface CategoryProps {
    category?: string | null
}

export const Category: React.FC<CategoryProps> = ({ category }) => (
    <TableCell>{category || '-'}</TableCell>
)
