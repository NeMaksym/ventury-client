import { ExpensesPage } from './ExpensesAllPage'
import { UploadPage } from './UploadPage'

export const enum PagePath {
    UPLOAD = '/upload',
    EXPENSES = '/expenses',
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
]
