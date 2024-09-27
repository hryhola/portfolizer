'use client'

import React, { useRef, useState } from 'react'
import { ComplexityLevelData } from './complexityLevelsBlock';
import { Plus } from 'lucide-react';
import { moveOrderedElementDown, moveOrderedElementUp } from '@/lib/array';
import { useProjectContext } from './projectFormWrapper';
import { cn } from '@/lib/utils';
import { ComplexityLevelValue } from './complexityLevel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EditButtons } from '@/components/ui/editButtons';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const LevelSelect = (props: {
        className?: string,
        level?: ComplexityLevelValue,
        onValueChange?: (value: ComplexityLevelValue) => void
    }) => <Select value={props.level} onValueChange={props.onValueChange}>
    <SelectTrigger className={cn("w-[180px]", props.className)}>
        <SelectValue placeholder="Level" />
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="Low">Low</SelectItem>
        <SelectItem value="Medium">Medium</SelectItem>
        <SelectItem value="High">High</SelectItem>
    </SelectContent>
</Select>

interface EditableComplexityLevel extends ComplexityLevelData {}

export const EditableComplexityLevel: React.FC<EditableComplexityLevel> = (props) => {
    const { setComplexity } = useProjectContext()

    const handleRemove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id

        setComplexity((prev) => prev.filter(p => p.id !== id))
    }

    const handleUp: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id

        if (!id) return

        setComplexity(prev => moveOrderedElementUp(prev, id))
    }

    const handleDown: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id

        if (!id) return

        setComplexity(prev => moveOrderedElementDown(prev, id))
    } 

    const handleLevelUpdate = (level: ComplexityLevelValue) => {
        setComplexity(prev => prev.map(p => {
            if (p.id === props.id) {
                return {
                    ...p,
                    value: level
                }
            }
        
            return p
        }))
    }

    const handleExplanationUpdate: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setComplexity(prev => prev.map(p => {
            if (p.id === props.id) {
                return {
                    ...p,
                    explanation: e.currentTarget?.value
                }
            }
        
            return p
        }))
    }

    return <li className='flex gap-2'>
        <EditButtons id={props.id} onDown={handleDown} onRemove={handleRemove} onUp={handleUp} />
        <Input disabled required defaultValue={props.id} />
        <LevelSelect level={props.value} onValueChange={handleLevelUpdate} />
        <Textarea value={props.explanation} onChange={handleExplanationUpdate} placeholder='Explanation' />
    </li>
}

interface EditableComplexityLevelsProps {
}

export const EditableComplexityLevels: React.FC<EditableComplexityLevelsProps> = (props) => {
    const newComplexityNameRef = useRef<HTMLInputElement>(null)
    const [newComplexityLevelValue, setNewComplexityLevelValue] = useState<ComplexityLevelValue|null>(null)
    const [message, setMessage] = useState('')
    const { complexity, setComplexity } = useProjectContext()

    const handleAdd = () => {
        const id = newComplexityNameRef.current?.value

        if (!id) {
            setMessage('Name should not be empty')
            return
        } else if (complexity.some(c => c.id === id)) {
            setMessage('Name should be unique')
            return

        } else if (!newComplexityLevelValue) {
            setMessage('Level value should not be empty')
            return
        } else {
            setMessage('')
        }

        setComplexity(prev => [
            ...prev,
            {
                id,
                value: newComplexityLevelValue,
                explanation: '',
                order: prev.length
            }
        ])
    }

    return <ul className="space-y-4">
        {complexity.map((l) => <EditableComplexityLevel key={l.id} {...l} />)}
        <li className='flex max-w-[550px] mx-auto'>
            <Input className='rounded-r-none border-r-0'
                ref={newComplexityNameRef}
                type='text'
                placeholder='New complexity'
            />
            <LevelSelect className='rounded-none' onValueChange={(value) => setNewComplexityLevelValue(value)} />
            <Button className='rounded-l-none' onClick={handleAdd} type='button'><Plus /></Button>
        </li>
        {message && <li className='text-sm text-destructive'>{message}</li>}
    </ul>;
}
