import { getCurrentUser } from '@/lib/firebase/admin/session';
import Link from 'next/link';
import React from 'react'

export const Header: React.FC = async () => {
    const currentUser = await getCurrentUser()

    return <div className='border-b border-black shadow-md z-20'>
        <div className='container mx-auto flex items-center justify-between my-2'>
            <Link className='text-3xl font-italic font-bold block grow text-center' href='/'>Portfolizer</Link>
            {currentUser && <Link className='hover:underline' href={`/${currentUser.id}`}>{currentUser.name}</Link>}
        </div>
    </div>;
}
