import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'

import { uploadPage, PagePath, expensesPages } from './pages/routes'
import { Layout } from './components'
import { DbProvider } from './context/DbContext'
import { CustomThemeProvider } from './context/ThemeContext'

const pages = [...uploadPage, ...expensesPages]

export function App() {
    return (
        <CustomThemeProvider>
            <DbProvider>
                <CssBaseline />
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            {pages.map(({ element, path }) => (
                                <Route
                                    key={path}
                                    path={path}
                                    element={element}
                                />
                            ))}
                            <Route
                                path="/"
                                element={
                                    <Navigate to={PagePath.UPLOAD} replace />
                                }
                            />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </DbProvider>
        </CustomThemeProvider>
    )
}
