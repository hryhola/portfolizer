'use client';

import React, { useState } from 'react'
import { EditableComponentProps } from '../../ui/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProjectContext } from './projectFormWrapper';

export interface PhotosData {
    src: string
}

interface ProjectPhotosProps extends EditableComponentProps {
    data: PhotosData[]
}

export const ProjectPhotos: React.FC<ProjectPhotosProps> = (props) => {
    const context = useProjectContext()

    const photos = context ? context.photos : props.data

    return <>
        {props.mode === 'edit' && <h4 className='font-mono mt-5 text-center'>Images</h4>}
        <div className='flex flex-wrap justify-center gap-5 m-5 '>
            {photos && photos.map((i) => <div key={i.src} className='relative max-w-[500px] '>
                {props.mode === 'edit' && <>
                    <Button className='z-10 absolute'
                        variant='ghost'
                        onClick={() => context.setPhotos(prev => prev.filter(p => p.src !== i.src))}
                        type='button'
                    >❌</Button>
                </>}
                <img className={cn('h-auto max-w-full rounded-lg border border-black', { 'opacity-50': props.mode === 'edit' })}
                    src={i.src}
                    alt=''
                />
            </div>)}
            {props.mode === 'edit' && <>
                <Input className='border-black max-w-[500px]'
                    placeholder="Pictures"
                    accept="image/*"
                    type='file'
                    multiple
                    name="photos"
                    onChange={(event) => {
                        if (!event.target.files || !event.target.files.length) return

                        const newFiles: { src: string, file?: File }[] = []

                        for (let i = 0; i < event.target.files.length; i++) {
                            newFiles.push({ src: URL.createObjectURL(event.target.files[i]), file: event.target.files[i] });
                        }

                        context.setPhotos(prev => [...prev, ...newFiles]);
                    }}
                />
            </>}
        </div></>;
}
