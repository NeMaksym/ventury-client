import { UploadPage } from './UploadPage'

export const enum PagePaths {
    UPLOAD = '/upload',
}

export interface PageRoute {
    element: React.ReactNode
    name: string
}

export const uploadPage: Record<PagePaths, PageRoute> = {
    [PagePaths.UPLOAD]: {
        element: <UploadPage />,
        name: 'Upload',
    },
}
