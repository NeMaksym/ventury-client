import { PropsWithChildren } from 'react'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

interface PageLayoutProps extends PropsWithChildren {
    title: string
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
    return (
        <Stack spacing={2}>
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>
            {children}
        </Stack>
    )
}
