import React, { useCallback, MouseEvent } from 'react'
import {
    TableCell,
    Select,
    MenuItem,
    FormControl,
    type SelectChangeEvent,
} from '@mui/material'

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
    const handleCategoryChange = useCallback(
        (e: SelectChangeEvent) => {
            onCategoryChange(
                transactionId,
                e.target.value === EMPTY_CATEGORY ? null : e.target.value
            )
        },
        [transactionId, onCategoryChange]
    )

    const handleSelectClick = useCallback((e: MouseEvent<HTMLElement>) => {
        e.stopPropagation()
    }, [])

    return (
        <TableCell onClick={handleSelectClick}>
            <FormControl fullWidth size="small">
                <Select
                    value={category || EMPTY_CATEGORY}
                    onChange={handleCategoryChange}
                    onClick={handleSelectClick}
                    displayEmpty
                    fullWidth
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
