import { PropsWithChildren } from 'react'
import { ConfigProvider, theme as antdTheme } from 'antd'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useStore } from '../context/StoreContext'

interface ThemeProps extends PropsWithChildren {}

export const Theme: React.FC<ThemeProps> = ({ children }) => {
    const { uiStore } = useStore()

    const theme = createTheme({
        palette: {
            mode: uiStore.mode,
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <ConfigProvider
                theme={{
                    algorithm:
                        uiStore.mode === 'dark'
                            ? antdTheme.darkAlgorithm
                            : antdTheme.defaultAlgorithm,
                }}
            >
                {children}
            </ConfigProvider>
        </ThemeProvider>
    )
}
