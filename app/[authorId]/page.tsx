'use client'

import Image from 'next/image';
import React from 'react'
import { ProjectsList } from '@/components/features/projectsList';

type Page = {
    searchParams: { mode: string },
    params: { authorId: string }
}

export default function Page(page: Page) {
    return <div className='container mx-auto px-5 mt-5 space-y-5'>
        <h1 className='text-5xl font-bold'>Some User</h1>
        <div className='flex flex-wrap sm:flex-nowrap gap-5'>
            <Image className='w-full sm:w-auto border border-black rounded' src='/images/Dude.webp' width={272} height={272} alt='Profile Picture' />
            <div className='space-y-5'>
                <p>Hello! I’m someone and this is stuff I did. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor porttitor tortor, vitae tincidunt ex tristique vitae. In vitae arcu lacus. Cras rutrum nibh nisi, et egestas quam molestie in</p>
                <div className='flex flex-wrap justify-around'>
                    <a href="tel:+380999999999">+380999999999</a>
                    <p>@DudeTgUsername</p>
                    <p>@DudeTwitterUsername</p>
                </div>
            </div>
        </div>
        <ProjectsList author='username' />
    </div>; 
}
