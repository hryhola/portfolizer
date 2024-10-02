import React from 'react'
import { EditableComponentProps } from '../../ui/types'
import { cn } from '@/lib/utils'
import { EditableLinksBlock } from './editableLinksBlock'

export interface LinkData {
    id: string,
    url: string,
    order: number
}

interface LinksBlockProps extends EditableComponentProps {
    data: LinkData[]
}

export const LinksBlock: React.FC<LinksBlockProps> = (props) => {
    return <>
        {props.mode === 'edit' && <div className='font-mono mt-10 text-center'>Links</div>}
        <ul className={cn('text-center divide-y divide-gray-500', props.className)}>
            {props.mode === 'view' && props.data.map(l => <li key={l.id} className='py-3'>{l.id} <a className='underline' target='_blank' href={l.url}>{l.url}</a></li>)}
            {props.mode === 'edit' && <EditableLinksBlock />}
        </ul>
    </>
}
