import React from 'react'
import { EditableComponentProps } from './types';
import { cn } from '@/lib/utils';
import { EditableLinksBlock } from './editableLinksBlock';

export interface LinkData {
    id: string,
    label: string,
    url: string,
    order: number
}

interface LinksBlockProps extends EditableComponentProps {
    data: LinkData[]
}

export const LinksBlock: React.FC<LinksBlockProps> = (props) => {
    return <>
        <ul className={cn('text-center divide-y-2', props.className)}>
            {props.mode === 'edit' && <li className='font-mono mt-10 mb-2 text-center'>Links</li>}
            {props.mode === 'view' && props.data.map(l => <li className='py-3'>{l.label} <a className='underline' href={l.url}>{l.url}</a></li>)}
            {props.mode === 'edit' && <EditableLinksBlock data={props.data} />}
        </ul>
    </>;
}
