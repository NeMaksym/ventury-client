import React from 'react'
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
} from '@mui/material'

import { Filters, Bank, Category } from '../hooks'

interface TransactionsFilterProps {
    options: {
        banks: Bank[]
        categories: Category[]
        labels: string[]
    }
    values: Filters
    handlers: {
        onStartDateChange: (startDate: string) => void
        onEndDateChange: (endDate: string) => void
        onBanksChange: (banks: string[]) => void
        onCategoriesChange: (categories: string[]) => void
        onLabelsChange: (labels: string[]) => void
    }
}

export const TransactionsFilter: React.FC<TransactionsFilterProps> = ({
    options,
    values,
    handlers,
}) => {
    const today = new Date().toISOString().split('T')[0]

    return (
        <Stack direction="row" spacing={2}>
            <TextField
                label="Start Date"
                type="date"
                value={values.startDate}
                onChange={(e) => handlers.onStartDateChange(e.target.value)}
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                    htmlInput: {
                        max: values.endDate || today,
                    },
                }}
            />

            <TextField
                label="End Date"
                type="date"
                value={values.endDate}
                onChange={(e) => handlers.onEndDateChange(e.target.value)}
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                    htmlInput: {
                        max: today,
                    },
                }}
            />

            <FormControl sx={{ width: 200 }}>
                <InputLabel>Bank</InputLabel>
                <Select
                    label="Bank"
                    multiple
                    value={values.banks}
                    onChange={(e) => {
                        const value = e.target.value
                        const selectedBanks =
                            typeof value === 'string' ? value.split(',') : value
                        handlers.onBanksChange(selectedBanks)
                    }}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {options.banks.map(({ value, label }) => (
                        <MenuItem key={value} value={value}>
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ width: 200 }}>
                <InputLabel>Category</InputLabel>
                <Select
                    label="Category"
                    multiple
                    value={values.categories}
                    onChange={(e) => {
                        const value = e.target.value
                        const selectedCategories =
                            typeof value === 'string' ? value.split(',') : value
                        handlers.onCategoriesChange(selectedCategories)
                    }}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {options.categories.map(({ value, label }) => (
                        <MenuItem key={value} value={value}>
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ width: 200 }}>
                <InputLabel>Labels</InputLabel>
                <Select
                    label="Labels"
                    multiple
                    value={values.labels}
                    onChange={(e) => {
                        const value = e.target.value
                        const selectedLabels =
                            typeof value === 'string' ? value.split(',') : value
                        handlers.onLabelsChange(selectedLabels)
                    }}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {options.labels.map((label) => (
                        <MenuItem key={label} value={label}>
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
    )
}
