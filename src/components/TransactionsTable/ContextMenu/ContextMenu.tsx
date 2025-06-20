import React from 'react'
import { Menu } from '@mui/material'
import { SubTransactionData } from '../types'
import { VisibilityMenuItem } from './VisibilityMenuItem'
import { CapitalizeMenuItem } from './CapitalizeMenuItem'
import { SubTransactionMenuItem } from './SubTransactionMenuItem'
import { DeleteMenuItem } from './DeleteMenuItem'
import { CommentMenuItem } from './CommentMenuItem'

interface ContextMenuProps {
    anchorEl: HTMLElement | null
    open: boolean
    onClose: () => void
    comment: string | undefined
    isHidden: boolean
    isCapitalized: boolean
    onHideClick: () => void
    onCapitalizeClick: () => void
    onCommentSave: (comment: string) => void
    onDeleteClick: () => void
    onSubTransactionCreate?: (data: SubTransactionData) => void
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
    anchorEl,
    open,
    onClose,
    comment,
    isHidden,
    isCapitalized,
    onHideClick,
    onCapitalizeClick,
    onCommentSave,
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
            <CommentMenuItem comment={comment} onCommentSave={onCommentSave} />
            {onSubTransactionCreate && (
                <SubTransactionMenuItem
                    onSubTransactionCreate={onSubTransactionCreate}
                />
            )}
            <DeleteMenuItem onClick={onDeleteClick} />
        </Menu>
    )
}
