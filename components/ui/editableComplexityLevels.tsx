'use client'

import React, { useState } from 'react'
import { ComplexityLevelData } from './complexityLevelsBlock';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Textarea } from './textarea';
import { Button } from './button';
import { ChevronUp, ChevronDown, Plus } from 'lucide-react';
import { moveOrderedElementDown, moveOrderedElementUp } from '@/lib/array';
import { v4 } from 'uuid';
import { EditButtons } from './editButtons';

interface EditableComplexityLevel extends ComplexityLevelData {
    onRemove: React.MouseEventHandler<HTMLButtonElement>
    onUp: React.MouseEventHandler<HTMLButtonElement>
    onDown: React.MouseEventHandler<HTMLButtonElement>
}

export const EditableComplexityLevel: React.FC<EditableComplexityLevel> = (props) => {
    return <li className='flex gap-2'>
        <EditButtons {...props} />
        <Input placeholder='Name' required defaultValue={props.label} />
        <Select required>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
            </SelectContent>
            <Textarea placeholder='Explanation' />
        </Select>
    </li>
}

interface EditableComplexityLevelsProps {
    data: ComplexityLevelData[]
}

export const EditableComplexityLevels: React.FC<EditableComplexityLevelsProps> = (props) => {
    const [levels, setLevels] = useState([...props.data].sort((a, b) => a.order - b.order))


    const handleRemove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id

        setLevels((prev) => prev.filter(p => p.id !== id))
    }

    const handleUp: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id

        if (!id) return

        setLevels(prev => moveOrderedElementUp(prev, id))
    }

    const handleDown: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id

        if (!id) return

        setLevels(prev => moveOrderedElementDown(prev, id))
    }

    const handleAdd = () => {
        setLevels(prev => [
            ...prev,
            {
                id: v4(),
                label: '',
                level: 'Low',
                levelsExplanation: '',
                order: prev.length
            }
        ])
    }

    return <ul className="space-y-4">
        {levels.map((l) => <EditableComplexityLevel key={l.id}
            onRemove={handleRemove}
            onDown={handleDown}
            onUp={handleUp}
            {...l}
        />)}
        <li><Button onClick={handleAdd} type='button'><Plus /></Button></li>
    </ul>;
}
