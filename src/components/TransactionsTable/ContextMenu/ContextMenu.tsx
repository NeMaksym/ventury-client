import React from 'react'
import Menu from '@mui/material/Menu'

import { VisibilityMenuItem } from './VisibilityMenuItem'
import { CapitalizeMenuItem } from './CapitalizeMenuItem'
import { SubTransactionMenuItem } from './SubTransactionMenuItem'
import { DeleteMenuItem } from './DeleteMenuItem'
import { CommentMenuItem } from './CommentMenuItem'

interface ContextMenuProps {
    anchorEl: HTMLElement | null
    open: boolean
    onClose: () => void
    isHidden: boolean
    isCapitalized: boolean
    onHideClick: () => void
    onCapitalizeClick: () => void
    onCommentClick: () => void
    onDeleteClick: () => void
    onSubTransactionClick?: () => void
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
    anchorEl,
    open,
    onClose,
    isHidden,
    isCapitalized,
    onHideClick,
    onCapitalizeClick,
    onCommentClick,
    onDeleteClick,
    onSubTransactionClick,
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
            <CommentMenuItem onClick={onCommentClick} />
            {onSubTransactionClick && (
                <SubTransactionMenuItem onClick={onSubTransactionClick} />
            )}
            <DeleteMenuItem onClick={onDeleteClick} />
        </Menu>
    )
}
