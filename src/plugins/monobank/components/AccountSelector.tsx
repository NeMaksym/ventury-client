import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { currency } from '../../../utils/currency'
import { MonoAPIClientInfo } from '../types'

interface AccountSelectorProps {
    accounts: MonoAPIClientInfo['accounts']
    value: string
    onChange: (id: string) => void
    disabled: boolean
}

function getPrefix(currencyCode: number): string {
    const symbol = currency.getSymbolByNumCode(currencyCode)
    return symbol ?? currency.numToAlpha(currencyCode)
}

function getPostfix(type?: string): string {
    return type ? `(${type})` : ''
}

function getLabel({
    currencyCode,
    maskedPan,
    iban,
    type,
}: MonoAPIClientInfo['accounts'][number]): string {
    return `${getPrefix(currencyCode)} ${maskedPan[0] ?? iban} ${getPostfix(
        type
    )}`
}

export const AccountSelector: React.FC<AccountSelectorProps> = ({
    accounts,
    value,
    onChange,
    disabled,
}) => {
    return (
        <FormControl fullWidth disabled={disabled}>
            <InputLabel id="mono-account-selector-label">Account</InputLabel>
            <Select
                labelId="mono-account-selector-label"
                id="mono-account-selector"
                label="Account"
                value={value}
                onChange={(e) => onChange(String(e.target.value))}
            >
                {accounts.map((acc) => (
                    <MenuItem key={acc.id} value={acc.id}>
                        {getLabel(acc)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
