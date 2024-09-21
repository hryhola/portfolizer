import React from 'react'
import { EditableComponentProps } from '../../ui/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

type ProjectSignProps = EditableComponentProps & {
    authorPictureSrc?: string
    projectClient: string
}

export const ProjectSign: React.FC<ProjectSignProps> = (props) => {
    const textClasses = 'text-xl self-center'
    const className = cn('gap-2 flex flex-wrap', textClasses, props.className)

    return <h3 className={className}>
        <div className='flex items-top'>
            <Avatar className="w-7 h-7 mr-2 inline-block border border-black">
                <AvatarImage src={props.authorPictureSrc} />
                <AvatarFallback>{props.value}</AvatarFallback>
            </Avatar>
            <Link className='hover:underline' href='/dude12'>{props.value}</Link>
        </div>
        <div className={cn({ 'flex gap-2 items-start': props.mode === 'edit' })}>& {props.mode === 'edit'
            ? <Input className={cn('relative top-[-6px]', textClasses)}
                name="client"
                variant='slim'
                required
                defaultValue={props.projectClient}
                placeholder='Project Client'
            />
            : props.projectClient}
        </div>
    </h3>;
}
