'use client'

import React, { useRef, useState } from 'react'
import { StackData } from './stackBlock';
import { Button } from './button';
import { Separator } from './separator';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { moveOrderedElementDown, moveOrderedElementUp } from '@/lib/array';
import { Input } from './input';
import { v4 } from 'uuid';

interface EditableStackBlockProps {
    data: StackData[]
}

export const EditableStackBlock: React.FC<EditableStackBlockProps> = (props) => {
    const [stack, setStack] = useState([...props.data].sort((a, b) => a.order - b.order));
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleRemove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id

        setStack((prev) => prev.filter(p => p.id !== id))
    }

    const handleUp: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id
    
        if (!id) return
    
        setStack(prev => moveOrderedElementUp(prev, id))
    }

    const handleDown: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id
    
        if (!id) return
    
        setStack(prev => moveOrderedElementDown(prev, id))
    }

    const handleAdd = () => {
        const value = inputRef.current?.value;

        if (typeof value !== 'string' || !value.includes(':')) return;

        const separator = value.indexOf(':');

        const field = value.substring(0, separator)
        const fieldValue = value.substring(separator + 1, value.length)


        setStack(prev => [
            ...prev,
            {
                id: v4(),
                field,
                value: fieldValue,
                order: prev.length
            }
        ])

        inputRef.current!.value = ''
    }

    return <ul>
        {stack.map((d, i) => <React.Fragment key={d.id}><li className='mb-px whitespace-nowrap'>
            <Button className='rounded-full px-2 h-8'
                data-id={d.id}
                type='button'
                variant='destructive'
                onClick={handleRemove}
            >
                ❌ {d.field}:&nbsp;<b>{d.value}</b>
            </Button>
            <Button className='h-8 px-2 opacity-40 hover:opacity-100 focus:opacity-100 relative top-2'
                variant='ghost'
                data-id={d.id}
                onClick={handleUp}
                type='button'
            >
                <ChevronUp />
            </Button>
            <Button className='h-8 px-2 opacity-40 hover:opacity-100 focus:opacity-100 relative top-2'
                variant='ghost'
                data-id={d.id}
                onClick={handleDown}
                type='button'
            >
                <ChevronDown />
            </Button>
        </li>{i === 4 && <Separator className='bg-gray-300 mt-2' />}</React.Fragment>)}
        <li className='mt-2 flex'>
            <Input className='rounded-r-none'
                ref={inputRef}
                maxLength={50}
                type='text'
                placeholder='Colon (:) separated strings'
                name='newStackValue'
            />
            <Button className='rounded-l-none' type='button' onClick={handleAdd}>
                <Plus />
            </Button>
        </li>
    </ul>;
}
