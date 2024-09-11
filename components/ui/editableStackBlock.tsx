'use client'

import React, { useRef, useState } from 'react'
import { StackData } from './stackBlock';
import { Button } from './button';
import { Separator } from './separator';
import { Plus } from 'lucide-react';
import { moveOrderedElementDown, moveOrderedElementUp } from '@/lib/array';
import { Input } from './input';
import { v4 } from 'uuid';
import { EditButtons } from './editButtons';

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
        {stack.map((d, i) => <React.Fragment key={d.id}><li className='mb-px flex justify-end'>
            <EditButtons id={d.id}
                onDown={handleDown}
                onRemove={handleRemove}
                onUp={handleUp}
                removeButtonContent={<>{d.field}:&nbsp;<b>{d.value}</b>&nbsp;❌</>}
            />
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
