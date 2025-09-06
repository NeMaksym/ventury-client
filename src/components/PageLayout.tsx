import { Box, Typography, Stack } from '@mui/material'
import { PropsWithChildren } from 'react'

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
