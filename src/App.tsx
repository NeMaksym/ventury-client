import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'

import {
    expensesPages,
    PagePaths as ExpensesPagePaths,
} from './expenses/pages/routes'
import { Layout } from './shared/components'

export function App() {
    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <Layout>
                    <Routes>
                        {Object.entries(expensesPages).map(
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
                                <Navigate
                                    to={ExpensesPagePaths.UPLOAD}
                                    replace
                                />
                            }
                        />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </>
    )
}
