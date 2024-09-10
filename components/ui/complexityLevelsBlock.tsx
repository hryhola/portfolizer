import React, { PureComponent } from 'react'
import ComplexityLevel from './complexityLevel'
import { cn } from '@/lib/utils'

type Props = {
    className?: string
    data: {
        order: number,
        label: string,
        level: 'Low' | 'High' | 'Medium'
        levelsExplanation?: string
    }[]
}

export const ComplexityLevelsBlock: React.FC<Props> = (props) => {
    return (
        <div className={cn('', props.className)}>
            <h4 className='font-mono mb-3'>Complexity</h4>
            <ul className="whitespace-nowrap flex flex-col sm:flex-row flex-wrap gap-x-5 md:justify-around justify-center">
                {props.data.map((l) => <li key={l.order}>{l.label}: <ComplexityLevel explanation={l.levelsExplanation} level={l.level} /></li>)}
            </ul>
        </div>
    )
}
