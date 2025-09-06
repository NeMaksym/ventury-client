import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'

import { uploadPage, PagePath, expensesPages } from './pages/routes'
import { AppLayout, Theme } from './components'
import { StoreProvider } from './context/StoreContext'

const pages = [...uploadPage, ...expensesPages]

export function App() {
    return (
        <StoreProvider>
            <Theme>
                <CssBaseline />
                <BrowserRouter>
                    <AppLayout>
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
                    </AppLayout>
                </BrowserRouter>
            </Theme>
        </StoreProvider>
    )
}
