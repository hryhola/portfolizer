'use client'

import { Pie, PieChart } from 'recharts'

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import { TimeData } from './timeSpentChart'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export const description = 'A donut chart'

type Props = {
    data: TimeData[]
}

export function TimeSpentChartDetails(props: Props) {
    const colors = [
        'hsl(var(--chart-1)',
        'hsl(var(--chart-2)',
        'hsl(var(--chart-3)',
        'hsl(var(--chart-4)',
        'hsl(var(--chart-5)',
        '#881337',
        '#4a044e',
        '#6d28d9',
        '#4338ca',
        '#172554',
        '#082f49',
    ]

    const processedData = [...props.data]
        .sort((a, b) => b.minutes - a.minutes)
        .map((a, i) => ({ ...a, fill: colors[i] }))

    const chartConfig = processedData.reduce((acc, curr, i) => ({ ...acc, [curr.id]: { ...curr, color: colors[i] } }), {})

    return (<>
        <Accordion type='single' collapsible>
            <AccordionItem className='border-0' value='item-1'>
                <AccordionTrigger className='justify-center gap-4'>time spent in details</AccordionTrigger>
                <AccordionContent>
                    <div className='grid grid-cols-2 border border-black rounded p-5 md:p-0 shadow-lg'>
                        <ChartContainer
                            config={chartConfig}
                            className='aspect-square h-72 md:h-96 col-span-2 md:col-auto mx-auto md:ml-auto md:mr-0'
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={processedData}
                                    dataKey='minutes'
                                    nameKey='id'
                                    innerRadius={60}
                                />
                            </PieChart>
                        </ChartContainer>
                        <div className='flex col-span-2 md:col-auto flex-col justify-center space-y-5'>
                            <h4 className='text-2xl font-semibold'>Time</h4>
                            <ul className='space-y-2 md:max-w-[500px]'>
                                {processedData.map(r => <li className='' key={r.id}>
                                    <p className='flex gap-4 items-center text-xl'><span className='size-3' style={{ background: r.fill }} ></span> {r.id}: {r.minutes} min</p>
                                    {r.details ? <p className='text-gray-500'>{r.details}</p> : <></>}
                                </li>)}
                            </ul>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </>)
}
