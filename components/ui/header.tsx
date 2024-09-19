import Link from 'next/link';
import React from 'react'

interface HeaderProps {
    
}

export const Header: React.FC<HeaderProps> = (props) => {
    return <div className='border-b border-black text-3xl'>
        <div className='text-center my-2'>
            <Link className='font-[family-name:var(--font-isocpeur-italic)] font-bold' href='/'>Portfolizer</Link>
        </div>
    </div>;
}
