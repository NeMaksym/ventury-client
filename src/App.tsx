import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'

import { TopBar, NavList } from './components'
import { sideMenuPages, DEFAULT_PAGE } from './pages'

export function App() {
    return (
        <BrowserRouter>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    overflow: 'hidden',
                }}
            >
                <CssBaseline />
                <TopBar />
                <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
                    <NavList />
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            overflow: 'auto',
                            padding: 2,
                        }}
                    >
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
