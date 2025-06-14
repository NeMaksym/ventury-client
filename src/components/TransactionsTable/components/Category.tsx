import React from 'react'
import { TableCell, Select, MenuItem, FormControl } from '@mui/material'

const EMPTY_CATEGORY = ''

const CATEGORIES = [
    '🎓 Education',
    '👥 Family & Friends',
    '🍽️ Food & Dining',
    '🏥 Health',
    '🍿 Leisure',
    '🏠 Living Place',
    '⚖️ Obligations',
    '📦 Other',
    '👤 Personal & Self-Care',
    '⚙️ Personal Efficiency',
    '🏆 Sports',
    '🚗 Transportation',
]

interface CategoryProps {
    transactionId: string
    category: string | null
    onCategoryChange: (transactionId: string, category: string | null) => void
}

export const Category: React.FC<CategoryProps> = ({
    transactionId,
    category,
    onCategoryChange,
}) => {
    return (
        <TableCell onClick={(e) => e.stopPropagation()}>
            <FormControl fullWidth size="small">
                <Select
                    fullWidth
                    displayEmpty
                    value={category || EMPTY_CATEGORY}
                    onChange={(e) =>
                        onCategoryChange(
                            transactionId,
                            e.target.value === EMPTY_CATEGORY
                                ? null
                                : e.target.value
                        )
                    }
                >
                    <MenuItem value={EMPTY_CATEGORY}>
                        <em>Select category</em>
                    </MenuItem>
                    {CATEGORIES.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </TableCell>
    )
}
