import React from 'react'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'

interface DateRangePickerProps {
    disabled: boolean
    startDate: dayjs.Dayjs
    endDate: dayjs.Dayjs
    onStartDateChange: (value: dayjs.Dayjs) => void
    onEndDateChange: (value: dayjs.Dayjs) => void
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
    disabled,
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
}) => {
    return (
        <DatePicker.RangePicker
            disabled={disabled}
            size="large"
            style={{
                paddingTop: 15,
                paddingBottom: 15,
                borderRadius: 4,
                height: 'auto',
            }}
            disabledDate={(current) =>
                !!current && current.isAfter(dayjs(), 'day')
            }
            value={[startDate, endDate]}
            onChange={(dates) => {
                if (dates && dates[0] && dates[1]) {
                    onStartDateChange(dates[0])
                    onEndDateChange(dates[1])
                }
            }}
        />
    )
}
