import React from 'react'
import {
    TableCell,
    Autocomplete,
    TextField,
    createFilterOptions,
} from '@mui/material'
import { TransactionActionHandler } from '../types'

const filter = createFilterOptions<string>()

interface LabelCellProps {
    options: string[]
    transactionId: string
    subTransactionId?: string
    labels: string[]
    onLabelChange: TransactionActionHandler<string[]>
}

export const LabelCell: React.FC<LabelCellProps> = ({
    options,
    transactionId,
    subTransactionId,
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
                        onLabelChange(transactionId, value, subTransactionId)
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
