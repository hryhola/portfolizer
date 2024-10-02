import React from 'react'
import { EditableComponentProps } from '../../ui/types';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

type ProjectDescriptionProps = EditableComponentProps

export const ProjectDescription: React.FC<ProjectDescriptionProps> = (props) => {
    const className = cn('whitespace-pre-wrap', props.className);

    return props.mode === 'edit' ? <Textarea className={cn('min-h-64', className)}
        name='description'
        placeholder='Description'
        defaultValue={props.value}
    /> : <p className={cn('p', className)}>{props.value}</p>;

}
