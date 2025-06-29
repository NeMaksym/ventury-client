import React from 'react'
import { Typography, Box } from '@mui/material'

import { CategoryList } from '../components'

interface CategoryItem {
    id: string
    label: string
}

const CATEGORIES: CategoryItem[] = [
    { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', label: '🎓 Education' },
    {
        id: 'b2c3d4e5-f6g7-8901-bcde-f23456789012',
        label: '👥 Family & Friends',
    },
    { id: 'c3d4e5f6-g7h8-9012-cdef-345678901234', label: '🍽️ Food & Dining' },
    { id: 'd4e5f6g7-h8i9-0123-def0-456789012345', label: '🏥 Health' },
    { id: 'e5f6g7h8-i9j0-1234-ef01-567890123456', label: '🍿 Leisure' },
    { id: 'f6g7h8i9-j0k1-2345-f012-678901234567', label: '🏠 Living Place' },
    { id: 'g7h8i9j0-k1l2-3456-0123-789012345678', label: '⚖️ Obligations' },
    { id: 'h8i9j0k1-l2m3-4567-1234-890123456789', label: '📦 Other' },
    {
        id: 'i9j0k1l2-m3n4-5678-2345-901234567890',
        label: '👤 Personal & Self-Care',
    },
    {
        id: 'j0k1l2m3-n4o5-6789-3456-012345678901',
        label: '⚙️ Personal Efficiency',
    },
    { id: 'k1l2m3n4-o5p6-7890-4567-123456789012', label: '🏆 Sports' },
    { id: 'l2m3n4o5-p6q7-8901-5678-234567890123', label: '🚗 Transportation' },
]

export const SettingsPage: React.FC = () => {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>
            <CategoryList
                categories={CATEGORIES}
                onCategoryAdd={() => {}}
                onCategoryEdit={() => {}}
                onCategoryDelete={() => {}}
            />
        </Box>
    )
}
