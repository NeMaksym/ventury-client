import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart'

interface YearGraphProps {
    data: Record<string, number[]>
}

const xLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

export const YearGraph: React.FC<YearGraphProps> = ({ data }) => {
    return (
        <LineChart
            width={800}
            height={350}
            series={Object.entries(data).map(([category, amounts]) => ({
                id: category,
                data: amounts,
                label: category,
            }))}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            hideLegend
        />
    )
}
