import { PageOne } from './PageOne/PageOne'
import { PageTwo } from './PageTwo/PageTwo'
import { PagePaths } from './constants'

export interface PageRoute {
    element: React.ReactNode
    name: string
}

export const sideMenuPages: Record<PagePaths, PageRoute> = {
    [PagePaths.PAGE_ONE]: {
        element: <PageOne />,
        name: 'Page One',
    },
    [PagePaths.PAGE_TWO]: {
        element: <PageTwo />,
        name: 'Page Two',
    },
}

export const DEFAULT_PAGE = PagePaths.PAGE_ONE
