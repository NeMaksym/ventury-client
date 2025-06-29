import React, { useState } from 'react'
import { Box, List, Divider } from '@mui/material'
import { CategoryListHeader } from './CategoryListHeader'
import { CategoryListItem } from './CategoryListItem'
import { AddCategoryDialog } from './AddCategoryDialog'

interface Category {
    id: string
    label: string
}

interface CategoryListProps {
    categories: Category[]
    onCategoryAdd: (label: string) => void
    onCategoryEdit: (categoryId: string, newLabel: string) => void
    onCategoryDelete: (categoryId: string) => void
}

export const CategoryList: React.FC<CategoryListProps> = ({
    categories = [],
    onCategoryAdd,
    onCategoryEdit,
    onCategoryDelete,
}) => {
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const handleOpenAddDialog = () => setAddDialogOpen(true)
    const handleCloseAddDialog = () => setAddDialogOpen(false)

    return (
        <Box width={400}>
            <List>
                <CategoryListHeader onAddClick={handleOpenAddDialog} />
                <Divider />
                {categories.map((category) => (
                    <CategoryListItem
                        key={category.id}
                        category={category}
                        onEdit={onCategoryEdit}
                        onDelete={onCategoryDelete}
                    />
                ))}
            </List>
            <AddCategoryDialog
                open={addDialogOpen}
                onClose={handleCloseAddDialog}
                onAdd={onCategoryAdd}
            />
        </Box>
    )
}
