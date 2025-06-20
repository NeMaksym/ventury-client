import React, { useState } from 'react'
import { IconButton, TableCell } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import {
    SubTransactionCreateHandler,
    SubTransactionData,
    TransactionActionHandler,
    TransactionDeleteHandler,
} from '../types'
import { ContextMenu } from '../ContextMenu'

interface ContextMenuCellProps {
    transactionId: string
    subTransactionId?: string
    isHidden: boolean
    isCapitalized: boolean
    onHideChange: TransactionActionHandler<boolean>
    onCapitalizeChange: TransactionActionHandler<boolean>
    onDelete: TransactionDeleteHandler
    onSubTransactionCreate?: SubTransactionCreateHandler
}

export const ContextMenuCell: React.FC<ContextMenuCellProps> = ({
    transactionId,
    subTransactionId,
    isHidden,
    isCapitalized,
    onHideChange,
    onCapitalizeChange,
    onDelete,
    onSubTransactionCreate,
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <TableCell onClick={(e) => e.stopPropagation()}>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ color: 'text.secondary' }}
            >
                <MoreVert />
            </IconButton>

            <ContextMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                isHidden={isHidden}
                isCapitalized={isCapitalized}
                onHideClick={() => {
                    onHideChange(transactionId, !isHidden, subTransactionId)
                    handleClose()
                }}
                onCapitalizeClick={() => {
                    onCapitalizeChange(
                        transactionId,
                        !isCapitalized,
                        subTransactionId
                    )
                    handleClose()
                }}
                onDeleteClick={() => {
                    onDelete(transactionId, subTransactionId)
                    handleClose()
                }}
                {...(onSubTransactionCreate && {
                    onSubTransactionCreate: (data: SubTransactionData) => {
                        onSubTransactionCreate(transactionId, data)
                    },
                })}
            />
        </TableCell>
    )
}
