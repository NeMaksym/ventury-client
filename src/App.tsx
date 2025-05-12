import { TopBar, DrawerMenu } from './components'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { useState } from 'react'

export function App() {
    const [isDrawerOpen, setDrawerOpen] = useState(false)

    const handleDrawerToggle = () => {
        setDrawerOpen(!isDrawerOpen)
    }

    return (
        <>
            <CssBaseline />
            <TopBar onMenuClick={handleDrawerToggle} />
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <DrawerMenu
                    open={isDrawerOpen}
                    onClose={() => setDrawerOpen(false)}
                />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {/* Page content will go here */}
                </Box>
            </Box>
        </>
    )
}
