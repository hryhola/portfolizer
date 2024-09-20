import React from 'react'
import { cn } from '@/lib/utils';

export type TimeData = {
  id: string
  description?: string
  minutesSpent: number
  percentOfMinutesSpent?: number // Calculated on frontend
}

type Props = {
  data: TimeData[]
}

export const TimeSpentChart = (props: Props) => {
  let cleanedData = props.data

  let sortedData = [...props.data].sort((a, b) => b.minutesSpent - a.minutesSpent);

  if (sortedData.length > 5) {
    const first4bars = sortedData.slice(0, 4);
    const restBars = sortedData.slice(4, sortedData.length);
    const other = restBars.reduce((acc, curr) => ({
      ...curr,
      id: 'other',
      label: 'Other',
      minutesSpent: curr.minutesSpent + acc.minutesSpent
    }), { id: 'other', label: 'Other', minutesSpent: 0 });

    cleanedData = [...first4bars, other]
  }

  const totalMinutes = cleanedData.reduce((sum, data) => sum + data.minutesSpent, 0);


  cleanedData.forEach(bar => {
    bar.percentOfMinutesSpent = totalMinutes > 0 ? (bar.minutesSpent / totalMinutes) * 100 : 0
  })

  const bgColors = [
    'bg-chart-1',
    'bg-chart-2',
    'bg-chart-3',
    'bg-chart-4',
    'bg-chart-5'
  ]

  return <div className='flex flex-wrap justify-start w-full'>
    {cleanedData.map((b, i) => <div
      key={b.id}
      style={{ width: b.percentOfMinutesSpent + '%' }}
      className={cn(bgColors[i], `p-2 text-white font-semibold flex justify-center items-center min-w-16`)}>
      {(b.minutesSpent / 60).toFixed(2) + 'h ' + b.id}
    </div>)}
  </div>
}
