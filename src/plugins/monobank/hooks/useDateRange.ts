import { useState } from 'react'
import dayjs from 'dayjs'

const MAX_DAY_RANGE = 30

export function useDateRange(): {
    startDate: dayjs.Dayjs
    endDate: dayjs.Dayjs
    setStartDate: (value: dayjs.Dayjs) => void
    setEndDate: (value: dayjs.Dayjs) => void
} {
    const [startDate, setStartDate] = useState(
        dayjs().subtract(MAX_DAY_RANGE, 'day')
    )
    const [endDate, setEndDate] = useState(dayjs())

    return { startDate, endDate, setStartDate, setEndDate }
}
