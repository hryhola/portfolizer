import { getCurrentUser } from '@/lib/firebase/admin/session'
import Link from 'next/link'
import React from 'react'

export const Header: React.FC = async () => {
    const currentUser = await getCurrentUser()

    return <div className='border-b border-black shadow-md z-20'>
        <div className='container mx-auto flex items-center justify-between my-2'>
            <Link className='ml-1 text-xl tracking-[-2px] sm:tracking-normal sm:text-3xl font-italic font-bold block grow text-center' href='/'>Portfolizer</Link>
            {currentUser && <Link className='text-sm sm:text-xl hover:underline text-right mr-1' href={`/${currentUser.id}`}>{currentUser.name}</Link>}
        </div>
    </div>
}
