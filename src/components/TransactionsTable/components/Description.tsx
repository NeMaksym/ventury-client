import React from 'react'
import { TableCell, Tooltip } from '@mui/material'

interface DescriptionProps {
    description: string
    comment?: string | undefined
}

export const Description: React.FC<DescriptionProps> = ({
    description,
    comment = '',
}) => {
    return (
        <TableCell>
            {comment ? (
                <Tooltip title={comment}>
                    <span style={{ cursor: 'help' }}>{description}</span>
                </Tooltip>
            ) : (
                description
            )}
        </TableCell>
    )
}
