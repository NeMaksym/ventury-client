import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const PageOne = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4">Page 1</Typography>
            <Typography component="p">
                This is the content of page 1.
            </Typography>
        </Box>
    )
}
