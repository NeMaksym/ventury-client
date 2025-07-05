import React from 'react'
import { Typography, Box } from '@mui/material'
import { YearGraph } from '../components'

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const data = {
    Food: Array.from({ length: 12 }, () => getRandomInt(100, 1000)),
    Entertainment: Array.from({ length: 12 }, () => getRandomInt(100, 1000)),
    Transportation: Array.from({ length: 12 }, () => getRandomInt(100, 1000)),
    Housing: Array.from({ length: 12 }, () => getRandomInt(100, 1000)),
    Utilities: Array.from({ length: 12 }, () => getRandomInt(100, 1000)),
    Healthcare: Array.from({ length: 12 }, () => getRandomInt(100, 1000)),
    Education: Array.from({ length: 12 }, () => getRandomInt(100, 1000)),
}

const ExpensesGraphPage: React.FC = () => {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Graph
            </Typography>
            <YearGraph data={data} />
        </Box>
    )
}

export { ExpensesGraphPage }
