'use client'

import React, { useState } from 'react'
import { TimeData } from './timeSpentChart';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { Button } from '../button';
import { Plus } from 'lucide-react';
import { v4 } from 'uuid';

interface EditableTimeSpentProps {
    data: TimeData[]
}

export const EditableTimeSpent: React.FC<EditableTimeSpentProps> = (props) => {
    const [time, setTime] = useState([...props.data])

    const handleRemove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id

        setTime((prev) => prev.filter(p => p.id !== id))
    }

    const handleAdd = () => {
        setTime(prev => [
            ...prev,
            {
                id: v4(),
                label: '',
                minutesSpent: 0,
                description: ''
            }
        ])
    }

    return <div className='mt-10 text-center'>
        <h3 className='font-mono mb-3'>Time</h3>
        <ul className='space-y-2'>
            {time.map(t => <li className='flex gap-2' key={t.id}>
                <Button variant='ghost'
                    type="button"
                    data-id={t.id}
                    onClick={handleRemove}
                >❌ </Button>
                <Input defaultValue={t.label} placeholder='Name' />
                <Input className='max-w-32' type='number' defaultValue={t.minutesSpent} placeholder='Minutes' />
                <Textarea placeholder='Details'  />
            </li>)}
            <li><Button type='button' onClick={handleAdd}><Plus /></Button></li>
        </ul>
    </div>;
}
