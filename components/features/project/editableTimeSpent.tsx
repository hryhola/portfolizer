'use client'

import React, { useRef, useState } from 'react'
import { TimeData } from './timeSpentChart';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useProjectContext } from './projectFormWrapper';

const TimeSpentRow: React.FC<TimeData> = (props) => {
    const { setTime } = useProjectContext()

    const handleRemove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id

        setTime((prev) => prev.filter(p => p.id !== id))
    }

    const handleMinutesChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setTime((prev) => prev.map(p => {
            if (p.id === props.id) {
                return {
                    ...p,
                    minutes: +e.target.value
                }
            }

            return p
        }))
    }

    return <li className='flex gap-2' >
        <Button variant='ghost'
            type='button'
            data-id={props.id}
            onClick={handleRemove}
        >❌ </Button>
        <Input disabled defaultValue={props.id} placeholder='Name' />
        <Input className='max-w-32'
            type='number'
            value={props.minutes}
            onChange={handleMinutesChange}
            placeholder='Minutes'
        />
        <Textarea placeholder='Details' defaultValue={props.details} name={`time-${props.id}-details`} />
    </li>
}

export const EditableTimeSpent: React.FC = () => {
    const { time, setTime } = useProjectContext()
    const newTimeNameRef = useRef<HTMLInputElement>(null)
    const newTimeValueRef = useRef<HTMLInputElement>(null)
    const [message, setMessage] = useState('')

    const handleAdd = () => {
        if (!newTimeNameRef.current?.value) {
            setMessage('Invalid time name')
            return
        } else if (!newTimeValueRef.current?.value) {
            console.log(newTimeValueRef.current?.value || !/[0-9]+/.test(newTimeValueRef.current!.value))
            setMessage('Invalid minutes value')
            return
        } else {
            setMessage('')
        }

        setTime(prev => [
            ...prev,
            {
                id: newTimeNameRef.current!.value,
                minutes: +newTimeValueRef.current!.value,
                details: ''
            }
        ])

        newTimeNameRef.current.value = ''
        newTimeValueRef.current.value = ''
    }

    return <div className='mt-10 text-center'>
        <h3 className='font-mono mb-3'>Time</h3>
        <ul className='space-y-2'>
            {time.map(t => <TimeSpentRow key={t.id} {...t} />)}
            <li className='flex max-w-[550px] mx-auto'>
                <Input className='rounded-r-none'
                    ref={newTimeNameRef}
                    type='text'
                    placeholder='New time'
                />
                <Input className='border-x-0 rounded-none max-w-32'
                    ref={newTimeValueRef}
                    type='number'
                    placeholder='Minutes'
                />
                <Button className='rounded-l-none' onClick={handleAdd} type='button'><Plus /></Button>
            </li>
            {message && <li className='text-sm text-destructive'>{message}</li>}
        </ul>
    </div>;
}
