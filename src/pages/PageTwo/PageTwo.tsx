import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const PageTwo = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4">Page 2</Typography>
            <Typography component="p">
                This is the content of page 2.
            </Typography>
        </Box>
    )
}
