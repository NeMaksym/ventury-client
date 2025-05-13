import Box from '@mui/material/Box'
import { PropsWithChildren } from 'react'

import { TopBar, NavList } from '..'

interface LayoutProps extends PropsWithChildren {}

function Layout({ children }: LayoutProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            <TopBar />
            <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
                <NavList />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        overflow: 'auto',
                        padding: 2,
                        minHeight: 0,
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

export default Layout
