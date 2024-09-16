'use client'

import React, { useRef } from 'react'
import { LinkData } from './linksBlock';
import { Button } from '../button';
import { Plus } from 'lucide-react';
import { Input } from '../input';
import { EditButtons } from '../editButtons';
import { moveOrderedElementUp, moveOrderedElementDown } from '@/lib/array';
import { useProjectContext } from './projectFormWrapper';

interface EditableLinksBlockProps {
    data: LinkData[]
}

export const EditableLinksBlock: React.FC<EditableLinksBlockProps> = (props) => {
    const nameInput = useRef<HTMLInputElement>(null);
    const urlInput = useRef<HTMLInputElement>(null);
    const { links, setLinks } = useProjectContext()

    const handleRemove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id

        setLinks((prev) => prev.filter(p => p.id !== id))
    }

    const handleUp: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id
    
        if (!id) return
    
        setLinks(prev => moveOrderedElementUp(prev, id))
    }

    const handleDown: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id
    
        if (!id) return
    
        setLinks(prev => moveOrderedElementDown(prev, id))
    }

    const handleAdd = () => {
        const name = nameInput.current?.value;
        const url = urlInput.current?.value;

        if (typeof name !== 'string' || !name.length) return;
        if (typeof url !== 'string' || !url.length) return;

        setLinks(prev => [
            ...prev,
            {
                id: name,
                url,
                order: prev.length
            }
        ])
    }

    return <>
        {links.map(l => <li key={l.id} className='py-3 flex justify-center items-center'>
            <EditButtons id={l.id} onRemove={handleRemove} onUp={handleUp} onDown={handleDown} />
            <span>
                {l.id} <a className='underline' target='_blank' href={l.url}>{l.url}</a>
            </span>
        </li>)}
        <li className='pt-3'>
            <div className='flex max-w-[550px] mx-auto '>
                <Input className='rounded-r-none border-r-0' placeholder='Link Name' ref={nameInput} />
                <Input className='rounded-none' placeholder='URL' ref={urlInput}/>
                <Button className='rounded-l-none' type='button' onClick={handleAdd}><Plus /></Button>
            </div>
        </li>
    </>
}
