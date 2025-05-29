import React, { createContext, useContext, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'

interface ThemeContextType {
    mode: PaletteMode
    toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [mode, setMode] = useState<PaletteMode>('light')

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    }

    const theme = createTheme({
        palette: {
            mode,
        },
    })

    return (
        <ThemeContext.Provider value={{ mode, toggleMode }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a CustomThemeProvider')
    }
    return context
}
