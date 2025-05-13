import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { Layout } from './components'
import { sideMenuPages, DEFAULT_PAGE } from './pages'

export function App() {
    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <Layout>
                    <Routes>
                        {Object.entries(sideMenuPages).map(
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
                            element={<Navigate to={DEFAULT_PAGE} replace />}
                        />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </>
    )
}
