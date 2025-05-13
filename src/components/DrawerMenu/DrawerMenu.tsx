import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { useNavigate } from 'react-router-dom'
import { sideMenuPages } from '../../pages'

const DRAWER_WIDTH = 240

interface DrawerMenuProps {
    open: boolean
    onClose: () => void
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ open, onClose }) => {
    const navigate = useNavigate()

    const handleNavigation = (path: string) => {
        navigate(path)
        onClose()
    }

    return (
        <Drawer
            variant="temporary"
            open={open}
            onClose={onClose}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: DRAWER_WIDTH,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {Object.entries(sideMenuPages).map(([path, { name }]) => (
                        <ListItem key={path} disablePadding>
                            <ListItemButton
                                onClick={() => handleNavigation(path)}
                            >
                                <ListItemText primary={name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}

export default DrawerMenu
