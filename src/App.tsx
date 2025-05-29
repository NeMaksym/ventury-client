import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'

import { uploadPage, PagePaths } from './pages/routes'
import { Layout } from './components'
import { DbProvider } from './context/DbContext'
import { CustomThemeProvider } from './context/ThemeContext'

const pages = { ...uploadPage }

export function App() {
    return (
        <CustomThemeProvider>
            <DbProvider>
                <CssBaseline />
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            {Object.entries(pages).map(
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
                                element={
                                    <Navigate to={PagePaths.UPLOAD} replace />
                                }
                            />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </DbProvider>
        </CustomThemeProvider>
    )
}
