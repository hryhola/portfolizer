'use client'

import React, { useRef, useState } from 'react'
import { TimeData } from './timeSpentChart';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { Button } from '../button';
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
                    minutesSpent: +e.target.value
                }
            }

            return p
        }))
    }

    const handleDetailsChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setTime((prev) => prev.map(p => {
            if (p.id === props.id) {
                return {
                    ...p,
                    description: e.target.value
                }
            }

            return p
        }))
    }

    return <li className='flex gap-2' >
        <Button variant='ghost'
            type="button"
            data-id={props.id}
            onClick={handleRemove}
        >❌ </Button>
        <Input disabled defaultValue={props.id} placeholder='Name' />
        <Input className='max-w-32'
            type='number'
            value={props.minutesSpent}
            onChange={handleMinutesChange}
            placeholder='Minutes'
        />
        <Textarea placeholder='Details' value={props.description} onChange={handleDetailsChange} />
    </li>
}

interface EditableTimeSpentProps {
}

export const EditableTimeSpent: React.FC<EditableTimeSpentProps> = (props) => {
    const { time, setTime } = useProjectContext()
    const newTimeNameRef = useRef<HTMLInputElement>(null)
    const newTimeValueRef = useRef<HTMLInputElement>(null)
    const [message, setMessage] = useState('')

    const handleAdd = () => {
        if (!newTimeNameRef.current?.value) {
            setMessage('Empty time name')
            return
        } else if (!newTimeValueRef.current?.value) {
            console.log(newTimeValueRef.current?.value || !/[0-9]+/.test(newTimeValueRef.current!.value))
            setMessage('Invalid minutes value')
            return
        } else {
            setMessage('')
            newTimeNameRef.current.value = ''
            newTimeValueRef.current.value = ''
        }

        setTime(prev => [
            ...prev,
            {
                id: newTimeNameRef.current!.value,
                minutesSpent: +newTimeValueRef.current!.value,
                description: ''
            }
        ])
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
            {message && <li>{message}</li>}
        </ul>
    </div>;
}
