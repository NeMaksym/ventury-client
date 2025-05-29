import React, { createContext, useContext, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'

interface ThemeContextType {
    mode: PaletteMode
    toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_STORAGE_KEY = 'ventury-theme-mode'

const getInitialTheme = (): PaletteMode => {
    try {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme
        }
    } catch (error) {
        console.warn('Failed to load theme from localStorage:', error)
    }
    return 'light'
}

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [mode, setMode] = useState<PaletteMode>(getInitialTheme)

    const toggleMode = () => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light'
            try {
                localStorage.setItem(THEME_STORAGE_KEY, newMode)
            } catch (error) {
                console.warn('Failed to save theme to localStorage:', error)
            }
            return newMode
        })
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
