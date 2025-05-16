import { ExpensesUploadPage } from './ExpensesUploadPage/ExpensesUploadPage'

export const enum PagePaths {
    UPLOAD = '/expenses/upload',
}

export interface PageRoute {
    element: React.ReactNode
    name: string
}

export const expensesPages: Record<PagePaths, PageRoute> = {
    [PagePaths.UPLOAD]: {
        element: <ExpensesUploadPage />,
        name: 'Upload',
    },
}
