import { cn } from '@/lib/utils'
import React from 'react'
import { Input } from '@/components/ui/input'

type Props = {
    className?: string
    mode?: 'view' | 'edit'
    value: string
}

export const ProjectName = (props: Props) => {
    const className = cn('text-5xl font-extrabold', props.className)

    return props.mode === 'edit' ? <Input className={cn(className, 'h-auto')}
        name='name'
        required
        variant='slim'
        defaultValue={props.value}
        placeholder='Project Name'
    /> : <h1 className={className}>{props.value}</h1>
}

