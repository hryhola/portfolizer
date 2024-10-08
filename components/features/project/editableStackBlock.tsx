'use client'

import React, { useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { moveOrderedElementDown, moveOrderedElementUp } from '@/lib/array'
import { useProjectContext } from './projectFormWrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EditButtons } from '@/components/ui/editButtons'
import { Separator } from '@/components/ui/separator'

export const EditableStackBlock: React.FC = () => {
    const [message, setMessage] = useState('')
    const { stack, setStack } = useProjectContext()

    const inputRef = useRef<HTMLInputElement | null>(null)

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
        const value = inputRef.current?.value

        if (!value) {
            setMessage('Empty value is not acceptable')
            return
        }

        const separatorIndex = value.indexOf(':')

        if (separatorIndex === -1) {
            setMessage('The column symbols is missing')
            return
        }

        const field = value.substring(0, separatorIndex).trim()
        const fieldValue = value.substring(separatorIndex + 1, value.length).trim()

        if (stack.some(s => s.id.toLowerCase() === field.toLowerCase())) {
            setMessage('Stack value should be unique')
            return
        } else if (!fieldValue.length) {
            setMessage('Empty value is not acceptable')
            return
        } else if (!/[ a-zA-Z0-9_-]+/.test(field)) {
            setMessage('Invalid characters')
            return  
        }else {
            setMessage('')
        }

        setStack(prev => [
            ...prev,
            {
                id: field,
                value: fieldValue,
                order: prev.length
            }
        ])

        inputRef.current!.value = ''
    }

    return <ul className='min-w-64'>
        {stack.map((d, i) => <React.Fragment key={d.id}><li className='mb-px flex justify-end'>
            <EditButtons id={d.id}
                onDown={handleDown}
                onRemove={handleRemove}
                onUp={handleUp}
                removeButtonContent={<>{d.id}:&nbsp;<b>{d.value}</b>&nbsp;❌</>}
            />
        </li>{i === 4 && <Separator className='my-1' />}
        </React.Fragment>)}
        <li className='mt-2 flex'>
            <Input className='rounded-r-none'
                ref={inputRef}
                maxLength={50}
                type='text'
                placeholder='Colon (:) separated strings'
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAdd() } }}
            />
            <Button className='rounded-l-none' type='button' onClick={handleAdd}>
                <Plus />
            </Button>
        </li>
        {message && <li className='text-sm text-destructive'>{message}</li>}
    </ul>
}
