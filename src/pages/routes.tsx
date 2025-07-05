import { ExpensesPage } from './ExpensesAllPage'
import { UploadPage } from './UploadPage'
import { SettingsPage } from './SettingsPage'
import { ExpensesGraphPage } from './ExpensesGraphPage'

export const enum PagePath {
    UPLOAD = '/upload',
    EXPENSES = '/expenses',
    EXPENSES_GRAPH = '/expenses/graph',
    SETTINGS = '/settings',
}
export interface PageRoute {
    element: React.ReactNode
    name: string
    path: PagePath
}

export const uploadPage: PageRoute[] = [
    {
        element: <UploadPage />,
        name: 'Upload',
        path: PagePath.UPLOAD,
    },
]

export const expensesPages: PageRoute[] = [
    {
        element: <ExpensesPage />,
        name: 'Expenses',
        path: PagePath.EXPENSES,
    },
    {
        element: <ExpensesGraphPage />,
        name: 'Graph',
        path: PagePath.EXPENSES_GRAPH,
    },
]

export const settingsPages: PageRoute[] = [
    {
        element: <SettingsPage />,
        name: 'Settings',
        path: PagePath.SETTINGS,
    },
]
