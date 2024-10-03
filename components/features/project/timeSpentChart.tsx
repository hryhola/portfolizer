import React from 'react'
import { cn } from '@/lib/utils'

export type TimeData = {
  id: string
  details?: string
  minutes: number
  percentOfMinutesSpent?: number // Calculated on frontend
}

type Props = {
  data: TimeData[]
}

export const TimeSpentChart = (props: Props) => {
    let cleanedData = props.data

    const sortedData = [...props.data].sort((a, b) => b.minutes - a.minutes)

    if (sortedData.length > 5) {
        const first4bars = sortedData.slice(0, 4)
        const restBars = sortedData.slice(4, sortedData.length)
        const other = restBars.reduce((acc, curr) => ({
            ...curr,
            id: 'other',
            label: 'Other',
            minutesSpent: curr.minutes + acc.minutes
        }), { id: 'other', details: 'Other', minutes: 0 })

        cleanedData = [...first4bars, other]
    }

    const totalMinutes = cleanedData.reduce((sum, data) => sum + data.minutes, 0)


    cleanedData.forEach(bar => {
        bar.percentOfMinutesSpent = totalMinutes > 0 ? (bar.minutes / totalMinutes) * 100 : 0
    })

    const bgColors = [
        'bg-chart-1',
        'bg-chart-2',
        'bg-chart-3',
        'bg-chart-4',
        'bg-chart-5'
    ]

    return <div className='flex flex-col md:flex-row flex-wrap items-center md:items-stretch justify-start w-full md:border border-black rounded'>
        {cleanedData.map((b, i) => <div
            key={b.id}
            style={{ width: b.percentOfMinutesSpent + '%' }}
            className={cn(
                bgColors[i],
                'p-2 text-white font-semibold flex justify-center items-center min-w-16 border-black',
                {
                    'rounded-l rounded-r md:rounded-r-none border md:border-none': i === 0,
                    'rounded-r rounded-l md:rounded-l-none border md:border-none': i === cleanedData.length - 1,
                    'rounded md:rounded-none border md:border-none my-px md:my-0 text-center': i !== 0 && i !== cleanedData.length - 1
                }
            )}>
            {(b.minutes / 60).toFixed(2) + 'h ' + b.id}
        </div>)}
    </div>
}
