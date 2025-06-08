import { ExpensesAllPage } from './ExpensesAllPage'
import { UploadPage } from './UploadPage'

export const enum PagePath {
    UPLOAD = '/upload',
    EXPENSES_ALL = '/expenses/all',
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
        element: <ExpensesAllPage />,
        name: 'Expenses: all',
        path: PagePath.EXPENSES_ALL,
    },
]
