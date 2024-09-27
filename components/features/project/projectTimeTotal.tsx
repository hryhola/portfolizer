import { cn } from '@/lib/utils';
import React from 'react'
import { EditableComponentProps } from '@/components/ui/types'
import { MdAccessTime } from 'react-icons/md';
import { Input } from '@/components/ui/input';

type ProjectTimeTotalProps = EditableComponentProps;

export const ProjectTimeTotal: React.FC<ProjectTimeTotalProps> = (props) => {
    const textClasses = 'text-xl sm:text-5xl font-bold sm:font-normal text-right whitespace-nowrap';
    
    return <h3 className={cn(textClasses, 'flex items-center justify-end gap-1 sm:gap-4', props.className)}>
        {(typeof props.value === 'number' || props.mode === 'edit') && <>
            <MdAccessTime className='inline opacity-20 relative top-[1px]' />
            {props.mode === 'edit'
                ? <Input className={cn('h-auto min-w-20 sm:min-w-28', textClasses)}
                    name="timeTotal"
                    type='number'
                    variant='slim'
                    defaultValue={props.value}
                    placeholder='99'
                />
                : props.value}
            h
        </>}
    </h3>;
}
