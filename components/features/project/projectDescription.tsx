import React from 'react'
import { EditableComponentProps } from '../../ui/types';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface ProjectDescriptionProps extends EditableComponentProps {
    
}

export const ProjectDescription: React.FC<ProjectDescriptionProps> = (props) => {
    const className = cn(props.className);

    return props.mode === 'edit' ? <Textarea className={cn('min-h-64', className)}
        name="description"
        placeholder='Description'
        defaultValue={props.value}
    /> : <p className={className}>{props.value}</p>;

}
