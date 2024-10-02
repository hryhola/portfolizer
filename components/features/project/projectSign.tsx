import React from 'react'
import { EditableComponentProps } from '../../ui/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

type ProjectSignProps = EditableComponentProps & {
    authorId: string
    authorImageSrc?: string
    projectClient?: string
    date?: Date
}

export const ProjectSign: React.FC<ProjectSignProps> = (props) => {
    const textClasses = 'text-xl self-center'
    const className = cn('gap-2 flex flex-wrap', textClasses, props.className)

    const defaultInputValue = props.date ? {
        defaultValue: props.date.toISOString().substring(0, 10)
    } : {}

    return <h3 className={className}>
        <div className='flex items-top'>
            <Avatar className='w-7 h-7 mr-2 inline-block border border-black'>
                <AvatarImage className='object-cover' src={props.authorImageSrc} />
                <AvatarFallback>{String(props.value).slice(0,2)}</AvatarFallback>
            </Avatar>
            <Link className='hover:underline' href={`/${props.authorId}`}>{props.value}</Link>
        </div>
        <div className={cn({ 'flex gap-2 items-start': props.mode === 'edit' })}>
            {props.projectClient || props.mode === 'edit' ? '& ' : ''}
            {props.mode === 'edit'
                ? <Input className={cn('relative top-[-6px]', textClasses)}
                    name='client'
                    variant='slim'
                    defaultValue={props.projectClient}
                    placeholder='Project Client'
                />
                : props.projectClient}
        </div>
        {(props.date || props.mode === 'edit') && <div className={cn('font-italic text-gray-500 tracking-[-4px]', { 'flex gap-2 items-start': props.mode === 'edit' })}>
            {props.mode === 'edit'
                ? <Input className='relative top-[-6px]' variant='slim' type='date' name='date' placeholder='Date' {...defaultInputValue} />
                : props.date!.getFullYear()}
        </div>}
    </h3>;
}
