import React from 'react';
import { cn } from '@/lib/utils';
import { StateBlockRest } from './stateBlockRest';
import { EditableComponentProps } from './types';
import { EditableStackBlock } from './editableStackBlock';

export type StackData = {
    id: string,
    order: number,
    field: string
    value: string
}

export type StackBlockProps = EditableComponentProps & {
    className?: string
    data: StackData[]
}

export const StackBlock: React.FC<StackBlockProps> = (props) => {
    const top5 = props.data.slice(0, 5)
    const rest = props.data.slice(5, props.data.length)

    return (
        <div className={cn('', props.className)}>
            <h4 className='font-mono mb-1'>Stack</h4>
            {props.mode === 'view' ?
                <ul className="whitespace-nowrap">
                    {top5.map(s => <li key={s.id}>{s.field}: <b>{s.value}</b></li>)}
                    <StateBlockRest data={rest} />
                </ul>
                : <></>}
            {props.mode === 'edit' ? <EditableStackBlock data={props.data} /> : <></>}
        </div>
    )
}
