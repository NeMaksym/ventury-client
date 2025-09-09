import React from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'

interface TokenInputProps {
    value: string
    onChange: (value: string) => void
}

export const TokenInput: React.FC<TokenInputProps> = ({ value, onChange }) => {
    return (
        <FormControl fullWidth>
            <InputLabel htmlFor="mono-api-token">Token</InputLabel>
            <OutlinedInput
                id="mono-api-token"
                label="Token"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <FormHelperText>
                You can get your API key from{' '}
                <a
                    href="https://api.monobank.ua"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                >
                    https://api.monobank.ua
                </a>
            </FormHelperText>
        </FormControl>
    )
}
