import { ExpensesTransactionsPage } from './ExpensesTransactionsPage'
import { UploadPage } from './UploadPage'
import { SettingsPage } from './SettingsPage'
import { ExpensesGraphPage } from './ExpensesGraphPage'

export const enum PagePath {
    UPLOAD = '/upload',
    EXPENSES = '/expenses',
    EXPENSES_TRANSACTIONS = '/expenses/transactions',
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
        element: <ExpensesTransactionsPage />,
        name: 'Transactions',
        path: PagePath.EXPENSES_TRANSACTIONS,
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
