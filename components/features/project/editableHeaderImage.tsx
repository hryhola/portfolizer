'use client';

import React, { useState } from 'react'
import { EditableComponentProps } from '../../ui/types';
import { ImageUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image'
import { Input } from '@/components/ui/input';

interface EditableHeaderImageProps extends EditableComponentProps {
    value?: string
    width: number
    height: number
    alt: string
}

export const EditableHeaderImage: React.FC<EditableHeaderImageProps> = (props) => {
    const [src, setSrc] = useState(props.value)

    return <div className='relative'>
        <div className='absolute flex items-center gap-2 pl-3 rounded bg-white z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <ImageUp />
            <Input className='border-0'
                placeholder='Picture' 
                accept='image/*'
                type='file'
                name='headerPicture' 
                onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                        setSrc(URL.createObjectURL(event.target.files[0]))
                    }
                }}
            />
        </div>
        <Image className={cn(props.className, { 'opacity-50': props.mode === 'edit' })} src={src!} alt={props.alt} width={props.width} height={props.height} />;
    </div>;
}
