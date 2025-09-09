import React from 'react'
import TableCell from '@mui/material/TableCell'
import Tooltip from '@mui/material/Tooltip'

interface DescriptionCellProps {
    description: string
    comment: string
}

export const DescriptionCell: React.FC<DescriptionCellProps> = ({
    description,
    comment,
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
