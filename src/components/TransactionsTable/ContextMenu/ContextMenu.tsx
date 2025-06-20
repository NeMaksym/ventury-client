import React from 'react'
import { Menu } from '@mui/material'
import { SubTransactionData } from '../types'
import { VisibilityMenuItem } from './VisibilityMenuItem'
import { CapitalizeMenuItem } from './CapitalizeMenuItem'
import { SubTransactionMenuItem } from './SubTransactionMenuItem'
import { DeleteMenuItem } from './DeleteMenuItem'

interface ContextMenuProps {
    anchorEl: HTMLElement | null
    open: boolean
    onClose: () => void
    isHidden: boolean
    isCapitalized: boolean
    onHideClick: () => void
    onCapitalizeClick: () => void
    onDeleteClick: () => void
    onSubTransactionCreate?: (data: SubTransactionData) => void
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
    anchorEl,
    open,
    onClose,
    isHidden,
    isCapitalized,
    onHideClick,
    onCapitalizeClick,
    onDeleteClick,
    onSubTransactionCreate,
}) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <VisibilityMenuItem isHidden={isHidden} onClick={onHideClick} />
            <CapitalizeMenuItem
                isCapitalized={isCapitalized}
                onClick={onCapitalizeClick}
            />
            {onSubTransactionCreate && (
                <SubTransactionMenuItem
                    onSubTransactionCreate={onSubTransactionCreate}
                />
            )}
            <DeleteMenuItem onClick={onDeleteClick} />
        </Menu>
    )
}
