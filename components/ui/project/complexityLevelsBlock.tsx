import React, { PureComponent } from 'react'
import ComplexityLevel from './complexityLevel'
import { cn } from '@/lib/utils'
import { EditableComponentProps } from '../types'
import { EditableComplexityLevels } from './editableComplexityLevels'

export interface ComplexityLevelData {
    id: string,
    order: number,
    label: string,
    level: 'Low' | 'High' | 'Medium'
    levelsExplanation?: string
}

type Props = EditableComponentProps & {
    data: ComplexityLevelData[]
}

export const ComplexityLevelsBlock: React.FC<Props> = (props) => {
    return (
        <div className={cn('', props.className)}>
            <h4 className='font-mono mb-3'>Complexity</h4>
            {props.mode === 'view' && <ul className="whitespace-nowrap flex flex-col sm:flex-row flex-wrap gap-x-5 md:justify-around justify-center">
                {props.data.map((l) => <li key={l.order}>{l.label}: <ComplexityLevel explanation={l.levelsExplanation} level={l.level} /></li>)}
            </ul>}
            {props.mode === 'edit' && <EditableComplexityLevels data={props.data} />}
        </div>
    )
}
