'use client';

import React, { useState } from 'react'
import { FeatureData } from './features';
import { EditButtons } from '../editButtons';
import { Textarea } from '../textarea';
import { moveOrderedElementUp, moveOrderedElementDown } from '@/lib/array';
import { Plus } from 'lucide-react';
import { v4 } from 'uuid';
import { Button } from '../button';
import { useProjectContext } from './projectFormWrapper';

interface EditableFeaturesProps {
    data: FeatureData[]
}

export const EditableFeatures: React.FC<EditableFeaturesProps> = (props) => {
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
            <Textarea defaultValue={f.text} />
        </li>)}
        <li><Button type='button' onClick={handleAdd}><Plus /></Button></li>
    </>;
}
