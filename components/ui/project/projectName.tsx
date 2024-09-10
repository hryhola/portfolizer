import { cn } from '@/lib/utils'
import React from 'react'
import { Input } from '../input'

type Props = {
    className?: string
    mode?: 'view' | 'edit'
    value: string
}

export const ProjectName = (props: Props) => {
    const className = cn("text-5xl font-extrabold", props.className)

    return props.mode === 'edit' ? <Input required variant='slim' className={cn(className, 'h-auto')} defaultValue={props.value} /> : <h1 className={className}>{props.value}</h1>
}

