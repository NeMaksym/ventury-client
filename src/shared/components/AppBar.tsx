import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export const TopBar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Ventury{' '}
                    <Box component="sup" sx={{ fontSize: '0.6em', ml: -0.5 }}>
                        Lite
                    </Box>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
