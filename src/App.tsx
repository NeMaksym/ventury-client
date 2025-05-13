import { useState } from 'react'
import { TopBar, DrawerMenu } from './components'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { sideMenuPages, DEFAULT_PAGE } from './pages'

export function App() {
    const [isDrawerOpen, setDrawerOpen] = useState(false)

    const handleDrawerToggle = () => {
        setDrawerOpen(!isDrawerOpen)
    }

    return (
        <BrowserRouter>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                }}
            >
                <CssBaseline />
                <TopBar onMenuClick={handleDrawerToggle} />
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <DrawerMenu
                        open={isDrawerOpen}
                        onClose={() => setDrawerOpen(false)}
                    />
                    <Box component="main" sx={{ flexGrow: 1, mt: 8 }}>
                        <Routes>
                            {Object.entries(sideMenuPages).map(
                                ([path, { element }]) => (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={element}
                                    />
                                )
                            )}
                            <Route
                                path="/"
                                element={<Navigate to={DEFAULT_PAGE} replace />}
                            />
                        </Routes>
                    </Box>
                </Box>
            </Box>
        </BrowserRouter>
    )
}
