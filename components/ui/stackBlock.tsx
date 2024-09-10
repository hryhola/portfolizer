import { cn } from '@/lib/utils'
import React from 'react'
import { StateBlockRest } from './StateBlockRest'

export type StackBlockProps = {
    className?: string
    data: {
        order: number,
        field: string
        value: string
    }[]
}

export const StackBlock: React.FC<StackBlockProps> = (props) => {
    const top5 = props.data.slice(0, 5)
    const rest = props.data.slice(5, props.data.length)

    return (
        <div className={cn('', props.className)}>
            <h4 className='font-mono mb-1'>Stack</h4>
            <ul className="whitespace-nowrap ">
                {top5.map(s => <li key={s.order}>{s.field}: <b>{s.value}</b></li>)}
                <StateBlockRest data={rest} />
            </ul>
        </div>
    )
}
