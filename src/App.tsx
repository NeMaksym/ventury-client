import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'

import {
    uploadPage,
    PagePath,
    expensesPages,
    settingsPages,
} from './pages/routes'
import { Layout, Theme } from './components'
import { StoreProvider } from './context/StoreContext'

const pages = [...uploadPage, ...expensesPages, ...settingsPages]

export function App() {
    return (
        <StoreProvider>
            <Theme>
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
                                path={PagePath.EXPENSES}
                                element={
                                    <Navigate
                                        to={PagePath.EXPENSES_TRANSACTIONS}
                                    />
                                }
                            />
                            <Route
                                path="/"
                                element={
                                    <Navigate to={PagePath.UPLOAD} replace />
                                }
                            />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </Theme>
        </StoreProvider>
    )
}
