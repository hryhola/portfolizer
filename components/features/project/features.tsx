import React from 'react'
import { EditableComponentProps } from '../../ui/types'
import { EditableFeatures } from './editableFeatures'

export interface FeatureData {
    id: string,
    text: string,
    order: number,
}

interface FeaturesProps extends EditableComponentProps {
    data: FeatureData[]
}

export const ProjectFeatures: React.FC<FeaturesProps> = (props) => {
    return <div className='border border-black rounded-md shadow-xl p-5'>
        {(props.mode === 'edit' || props.data.length > 0) && <h3 className='text-3xl pb-3'>Features I worked on</h3>}
        <ul className='space-y-3'>
            {props.mode === 'view' && props.data.map(f => <li key={f.order}>{f.text}</li>)}
            {props.mode === 'edit' && <EditableFeatures />}
        </ul>
    </div>
}
