import { ExpensesTransactionsPage } from './ExpensesTransactionsPage'
import { UploadPage } from './UploadPage'
import { SettingsPage as ExpensesConfigPage } from './ExpensesConfigPage'
import { ExpensesGraphPage } from './ExpensesGraphPage'

export const enum PagePath {
    UPLOAD = '/upload',
    EXPENSES = '/expenses',
    EXPENSES_TRANSACTIONS = '/expenses/transactions',
    EXPENSES_GRAPH = '/expenses/graph',
    EXPENSES_CONFIG = '/expenses/config',
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
    {
        element: <ExpensesConfigPage />,
        name: 'Configuration',
        path: PagePath.EXPENSES_CONFIG,
    },
]
