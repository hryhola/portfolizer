'use client'

import React from 'react'
import { moveOrderedElementUp, moveOrderedElementDown } from '@/lib/array'
import { Plus } from 'lucide-react'
import { v4 } from 'uuid'
import { useProjectContext } from './projectFormWrapper'
import { Button } from '@/components/ui/button'
import { EditButtons } from '@/components/ui/editButtons'
import { Textarea } from '@/components/ui/textarea'

export const EditableFeatures: React.FC = () => {
    const { features, setFeatures } = useProjectContext()

    const handleRemove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id

        setFeatures((prev) => prev.filter(p => p.id !== id))
    }

    const handleUp: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id
    
        if (!id) return
    
        setFeatures(prev => moveOrderedElementUp(prev, id))
    }

    const handleDown: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const id = (e.currentTarget as HTMLButtonElement).dataset.id
    
        if (!id) return
    
        setFeatures(prev => moveOrderedElementDown(prev, id))
    }

    const handleAdd = () => {
        setFeatures(prev => [
            ...prev,
            {
                id: v4(),
                text: '',
                order: prev.length
            }
        ])
    }

    return <>
        {features.map(f => <li key={f.id}>
            <div className='flex mb-1'>
                <EditButtons id={f.id} onDown={handleDown} onRemove={handleRemove} onUp={handleUp} />
            </div>
            <Textarea id={`feature-${f.id}-text`} name={`feature-${f.id}-text`} defaultValue={f.text} />
        </li>)}
        <li><Button type='button' onClick={handleAdd}><Plus /></Button></li>
    </>
}
