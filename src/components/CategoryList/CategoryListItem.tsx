import React, { useState } from 'react'
import { ListItem, ListItemText, IconButton } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'

import { EditCategoryDialog } from './EditCategoryDialog'
import { DeleteCategoryDialog } from './DeleteCategoryDialog'

interface Category {
    id: string
    label: string
}

interface CategoryListItemProps {
    category: Category
    onEdit: (categoryId: string, newLabel: string) => void
    onDelete: (categoryId: string) => void
}

export const CategoryListItem: React.FC<CategoryListItemProps> = ({
    category,
    onEdit,
    onDelete,
}) => {
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const handleOpenEditDialog = () => {
        setEditDialogOpen(true)
    }

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false)
    }

    const handleOpenDeleteDialog = () => {
        setDeleteDialogOpen(true)
    }

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false)
    }

    const handleEditCategory = (newLabel: string) => {
        onEdit(category.id, newLabel)
    }

    const handleDeleteCategory = () => {
        onDelete(category.id)
    }

    return (
        <>
            <ListItem
                sx={{
                    '& .category-actions': {
                        opacity: 0,
                        transition: 'opacity 0.2s ease-in-out',
                    },
                    '&:hover .category-actions': {
                        opacity: 1,
                    },
                    pl: 4,
                }}
                dense
                secondaryAction={
                    <div className="category-actions">
                        <IconButton
                            onClick={handleOpenEditDialog}
                            size="small"
                            sx={{ mr: 1 }}
                        >
                            <Edit />
                        </IconButton>
                        <IconButton
                            onClick={handleOpenDeleteDialog}
                            color="error"
                            size="small"
                        >
                            <Delete />
                        </IconButton>
                    </div>
                }
            >
                <ListItemText primary={category.label} />
            </ListItem>

            <EditCategoryDialog
                open={editDialogOpen}
                onClose={handleCloseEditDialog}
                onSave={handleEditCategory}
                initialLabel={category.label}
            />

            <DeleteCategoryDialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleDeleteCategory}
                categoryLabel={category.label}
            />
        </>
    )
}
