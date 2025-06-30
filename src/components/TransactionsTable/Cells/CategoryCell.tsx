import React from 'react'
import {
    TableCell,
    Select,
    MenuItem,
    FormControl,
    SelectChangeEvent,
} from '@mui/material'
import { useTransactionHandlers, useTransactionOptions } from '../context'

const EMPTY_CATEGORY = ''

interface CategoryCellProps {
    transactionId: string
    subTransactionId?: string
    category: string
}

export const CategoryCell: React.FC<CategoryCellProps> = ({
    transactionId,
    subTransactionId,
    category,
}) => {
    const { onCategoryChange } = useTransactionHandlers()
    const { categories } = useTransactionOptions()

    const handleChange = (e: SelectChangeEvent<string>) => {
        onCategoryChange(transactionId, e.target.value, subTransactionId)
    }

    return (
        <TableCell onClick={(e) => e.stopPropagation()}>
            <FormControl fullWidth size="small">
                <Select
                    fullWidth
                    displayEmpty
                    value={category}
                    onChange={handleChange}
                >
                    <MenuItem value={EMPTY_CATEGORY}>
                        <em>Select category</em>
                    </MenuItem>
                    {categories.map((categoryItem) => (
                        <MenuItem key={categoryItem.id} value={categoryItem.id}>
                            {categoryItem.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </TableCell>
    )
}
