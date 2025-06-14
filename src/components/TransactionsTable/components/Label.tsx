import React from 'react'
import {
    TableCell,
    Autocomplete,
    TextField,
    createFilterOptions,
} from '@mui/material'

const filter = createFilterOptions<string>()

interface LabelProps {
    options: string[]
    transactionId: string
    labels: string[]
    onLabelChange: (transactionId: string, labels: string[]) => void
}

export const Label: React.FC<LabelProps> = ({
    options,
    transactionId,
    labels,
    onLabelChange,
}) => {
    return (
        <TableCell onClick={(e) => e.stopPropagation()}>
            <Autocomplete
                fullWidth
                freeSolo
                selectOnFocus
                clearOnBlur
                blurOnSelect
                multiple
                disableClearable
                size="small"
                limitTags={1}
                options={options}
                value={labels}
                onChange={(_, value) => {
                    if (value) {
                        onLabelChange(transactionId, value)
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params)
                    const isExisting = options.some(
                        (option) => params.inputValue === option
                    )
                    if (params.inputValue !== '' && !isExisting) {
                        filtered.push(params.inputValue)
                    }
                    return filtered
                }}
                renderInput={(params) => {
                    const {
                        InputProps,
                        InputLabelProps,
                        inputProps,
                        ...restParams
                    } = params

                    return (
                        <TextField
                            {...restParams}
                            size={restParams.size || 'small'}
                            slotProps={{
                                input: InputProps,
                                inputLabel: InputLabelProps,
                                htmlInput: inputProps,
                            }}
                        />
                    )
                }}
            />
        </TableCell>
    )
}
