'use client'

import React, { useRef, useState } from 'react'
import { EditableComponentProps } from './types';
import { cn } from '@/lib/utils';
import { LinkData } from './linksBlock';
import { Button } from './button';
import { Plus } from 'lucide-react';
import { Input } from './input';
import { EditButtons } from './editButtons';
import { moveOrderedElementUp, moveOrderedElementDown } from '@/lib/array';
import { v4 } from 'uuid';
import { url } from 'inspector';

interface EditableLinksBlockProps {
    data: LinkData[]
}

export const EditableLinksBlock: React.FC<EditableLinksBlockProps> = (props) => {
    const nameInput = useRef<HTMLInputElement>(null);
    const urlInput = useRef<HTMLInputElement>(null);
    const [links, setLink] = useState([...props.data.sort((a,b) => a.order - b.order)]);

    const handleRemove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id

        setLink((prev) => prev.filter(p => p.id !== id))
    }

    const handleUp: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id
    
        if (!id) return
    
        setLink(prev => moveOrderedElementUp(prev, id))
    }

    const handleDown: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id
    
        if (!id) return
    
        setLink(prev => moveOrderedElementDown(prev, id))
    }

    const handleAdd = () => {
        const name = nameInput.current?.value;
        const url = urlInput.current?.value;

        if (typeof name !== 'string' || !name.length) return;
        if (typeof url !== 'string' || !url.length) return;

        setLink(prev => [
            ...prev,
            {
                id: v4(),
                label: name,
                url,
                order: prev.length
            }
        ])
    }

    return <>
        {links.map(l => <li className='py-3 flex justify-center items-center'>
            <EditButtons id={l.id} onRemove={handleRemove} onUp={handleUp} onDown={handleDown} />
            <span>
                {l.label} <a className='underline' target='_blank' href={l.url}>{l.url}</a>
            </span>
        </li>)}
        <li className='flex items-center pt-3'>
            <Input className='rounded-r-none border-r-0' placeholder='Link Name' ref={nameInput} />
            <Input className='rounded-none' placeholder='URL' ref={urlInput}/>
            <Button className='rounded-l-none' type='button' onClick={handleAdd}><Plus /></Button>
        </li>
    </>
}
