import React from 'react'
import ComplexityLevel from './complexityLevel'
import { cn } from '@/lib/utils'
import { EditableComponentProps } from '../../ui/types'
import { EditableComplexityLevels } from './editableComplexityLevels'

export interface ComplexityLevelData {
    id: string
    order: number
    value: 'Low' | 'High' | 'Medium'
    explanation?: string
}

type Props = EditableComponentProps & {
    data: ComplexityLevelData[]
}

export const ComplexityLevelsBlock: React.FC<Props> = (props) => {
    return (
        <div className={cn('px-4 sm:px-0 py-4 border border-black shadow-lg rounded-md', props.className)}>
            {(props.mode === 'edit' || props.data.length > 0) && <h4 className='font-mono text-sm mb-3'>Complexity</h4>}
            {props.mode === 'view' && <ul className='whitespace-nowrap flex flex-col sm:flex-row flex-wrap gap-x-5 md:justify-around justify-center'>
                {props.data.map((l) => <li key={l.order}>{l.id}: <ComplexityLevel explanation={l.explanation} level={l.value} /></li>)}
            </ul>}
            {props.mode === 'edit' && <EditableComplexityLevels />}
        </div>
    )
}
