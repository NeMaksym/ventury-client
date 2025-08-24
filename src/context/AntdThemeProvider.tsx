import { ConfigProvider, theme as antdTheme } from 'antd'

import { useTheme } from './ThemeContext'

export function AntdThemeProvider({ children }: { children: React.ReactNode }) {
    const { mode } = useTheme()

    return (
        <ConfigProvider
            theme={{
                algorithm:
                    mode === 'dark'
                        ? antdTheme.darkAlgorithm
                        : antdTheme.defaultAlgorithm,
            }}
        >
            {children}
        </ConfigProvider>
    )
}
