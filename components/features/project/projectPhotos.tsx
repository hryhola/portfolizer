'use client';

import React from 'react'
import { EditableComponentProps } from '../../ui/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProjectContext } from './projectFormWrapper';
import Image from 'next/image';

export interface PhotosData {
    src: string
    file?: File // For uploading new photos, client side only attribute
}

interface ProjectPhotosProps extends EditableComponentProps {
    data: PhotosData[]
}

export const ProjectPhotos: React.FC<ProjectPhotosProps> = (props) => {
    const context = useProjectContext()

    const photos = context ? context.photos : props.data

    return <>
        {props.mode === 'edit' && <h4 className='font-mono mt-5 text-center'>Images</h4>}
        <div className='flex flex-wrap justify-center gap-5 m-5'>
            {photos && photos.map((i) => <div key={i.src} className='relative max-w-[487px] '>
                {props.mode === 'edit' && <>
                    <Button className='z-10 absolute'
                        variant='ghost'
                        onClick={() => context.setPhotos(prev => prev.filter(p => p.src !== i.src))}
                        type='button'
                    >❌</Button>
                </>}
                <Image className={cn('h-auto max-w-full rounded-lg border border-black drop-shadow-md shadow-xl', { 'opacity-50': props.mode === 'edit' })}
                    width={1500}
                    height={1500}
                    src={i.src}
                    alt=''
                />
            </div>)}
            {props.mode === 'edit' && <>
                <Input className='border-black max-w-[500px]'
                    placeholder='Pictures'
                    accept='image/*'
                    type='file'
                    multiple
                    name='photos'
                    onChange={(event) => {
                        if (!event.target.files || !event.target.files.length) return

                        const newFiles: PhotosData[] = []

                        for (let i = 0; i < Math.min(event.target.files.length, 50); i++) {
                            newFiles.push({ src: URL.createObjectURL(event.target.files[i]), file: event.target.files[i] });
                        }

                        context.setPhotos(prev => [...prev, ...newFiles]);
                    }}
                />
            </>}
        </div></>;
}
