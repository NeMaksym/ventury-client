import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'

const BANK_OPTIONS = [
    { id: 'private', label: 'Private' },
    { id: 'mono', label: 'Mono' },
] as const

type BankType = (typeof BANK_OPTIONS)[number]['id']

interface StepOneProps {
    value: BankType
    onChange: (bank: BankType) => void
}

export function StepOne({ value, onChange }: StepOneProps) {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as BankType)
    }

    return (
        <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="bank-select-label">Bank</InputLabel>
            <Select
                labelId="bank-select-label"
                id="bank-select"
                value={value}
                label="Bank"
                onChange={handleChange}
            >
                {BANK_OPTIONS.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
