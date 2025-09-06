import React from 'react'
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
} from '@mui/material'

import { useStore } from '../context/StoreContext'

export const TransactionsFilter: React.FC = () => {
    const { expenseFilterStore } = useStore()

    const today = new Date().toISOString().split('T')[0]

    return (
        <Stack direction="row" spacing={2}>
            <TextField
                label="Start Date"
                type="date"
                value={expenseFilterStore.startDate}
                onChange={(e) =>
                    expenseFilterStore.updateStartDate(e.target.value)
                }
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                    htmlInput: {
                        max: expenseFilterStore.endDate || today,
                    },
                }}
            />

            <TextField
                label="End Date"
                type="date"
                value={expenseFilterStore.endDate}
                onChange={(e) =>
                    expenseFilterStore.updateEndDate(e.target.value)
                }
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                    htmlInput: {
                        min: expenseFilterStore.startDate,
                        max: today,
                    },
                }}
            />

            <FormControl sx={{ width: 200 }}>
                <InputLabel>Bank</InputLabel>
                <Select
                    label="Bank"
                    multiple
                    value={expenseFilterStore.banks}
                    onChange={(e) => {
                        const value = e.target.value
                        const selectedBanks =
                            typeof value === 'string' ? value.split(',') : value
                        expenseFilterStore.updateBanks(selectedBanks)
                    }}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {expenseFilterStore.bankOptions.map(({ value, label }) => (
                        <MenuItem key={value} value={value}>
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ width: 200 }}>
                <InputLabel>Account</InputLabel>
                <Select
                    label="Account"
                    multiple
                    value={expenseFilterStore.bankAccounts}
                    onChange={(e) => {
                        const value = e.target.value
                        const selectedAccounts =
                            typeof value === 'string' ? value.split(',') : value
                        expenseFilterStore.updateBankAccounts(selectedAccounts)
                    }}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {expenseFilterStore.bankAccountOptions.map(
                        ({ value, label }) => (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        )
                    )}
                </Select>
            </FormControl>

            <FormControl sx={{ width: 200 }}>
                <InputLabel>Category</InputLabel>
                <Select
                    label="Category"
                    multiple
                    value={expenseFilterStore.categories}
                    onChange={(e) => {
                        const value = e.target.value
                        const selectedCategories =
                            typeof value === 'string' ? value.split(',') : value
                        expenseFilterStore.updateCategories(selectedCategories)
                    }}
                    renderValue={(selected) => {
                        return selected
                            .map(
                                (id) =>
                                    expenseFilterStore.categoryOptions.find(
                                        (c) => c.id === id
                                    )?.label
                            )
                            .join(', ')
                    }}
                >
                    {expenseFilterStore.categoryOptions.map(({ id, label }) => (
                        <MenuItem key={id} value={id}>
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
                    value={expenseFilterStore.labels}
                    onChange={(e) => {
                        const value = e.target.value
                        const selectedLabels =
                            typeof value === 'string' ? value.split(',') : value
                        expenseFilterStore.updateLabels(selectedLabels)
                    }}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {expenseFilterStore.labelOptions.map((label) => (
                        <MenuItem key={label} value={label}>
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
    )
}
