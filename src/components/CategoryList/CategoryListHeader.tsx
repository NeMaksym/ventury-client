import React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Add from '@mui/icons-material/Add'

interface CategoryListHeaderProps {
    onAddClick: () => void
}

export const CategoryListHeader: React.FC<CategoryListHeaderProps> = ({
    onAddClick,
}) => {
    return (
        <ListItem>
            <ListItemText
                sx={{ my: 0 }}
                primary="Categories"
                slotProps={{
                    primary: {
                        fontSize: 20,
                        fontWeight: 'medium',
                        letterSpacing: 0,
                    },
                }}
            />
            <IconButton
                edge="end"
                onClick={onAddClick}
                size="small"
                color="primary"
            >
                <Add />
            </IconButton>
        </ListItem>
    )
}
