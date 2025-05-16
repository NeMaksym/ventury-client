import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import { useNavigate, useLocation } from 'react-router-dom'

import { expensesPages } from '../../expenses/pages/routes'

const NAVIGATION_WIDTH = 240

export const NavList: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Box
            sx={{
                width: NAVIGATION_WIDTH,
                flexShrink: 0,
                borderRight: 1,
                borderColor: 'divider',
            }}
        >
            <List sx={{ height: '100%', overflow: 'auto' }}>
                <ListItem disablePadding>
                    <ListItemText primary="Expenses" sx={{ pl: 2 }} />
                </ListItem>
                {Object.entries(expensesPages).map(([path, { name }]) => (
                    <ListItem key={path} disablePadding sx={{ pl: 2 }}>
                        <ListItemButton
                            onClick={() => navigate(path)}
                            selected={location.pathname === path}
                        >
                            <ListItemText primary={name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}
