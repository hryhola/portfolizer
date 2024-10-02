import React from 'react';
import { cn } from '@/lib/utils';
import { StateBlockRest } from './stateBlockRest';
import { EditableComponentProps } from '../../ui/types';
import { EditableStackBlock } from './editableStackBlock';

export type StackData = {
    id: string,
    order: number,
    value: string
}

export type StackBlockProps = EditableComponentProps & {
    className?: string
    data: StackData[]
}

export const StackBlock: React.FC<StackBlockProps> = (props) => {
    const stack = [...props.data].sort((a,b) => a.order - b.order)

    const top5 = stack.slice(0, 5)
    const rest = stack.slice(5, props.data.length)

    return (
        <div className={cn('', props.className)}>
            {(stack.length > 0 || props.mode === 'edit') && <h4 className='font-mono mb-1'>Stack</h4>}
            {props.mode === 'view' ?
                <ul className='whitespace-nowrap'>
                    {top5.map(s => <li key={s.id}>{s.id}: <b>{s.value}</b></li>)}
                    <StateBlockRest data={rest} />
                </ul>
                : <></>}
            {props.mode === 'edit' ? <EditableStackBlock /> : <></>}
        </div>
    )
}
