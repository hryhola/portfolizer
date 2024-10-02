import { isUserAuthenticated } from '@/lib/firebase/admin/session';
import { redirect } from 'next/navigation';
import React from 'react'

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = async (props) => {
    if (await isUserAuthenticated()) {
        redirect('/');
    }

    return <div className='container mx-auto min-h-[90vh] grid place-items-center py-5'>
        {props.children}
    </div>;
}

export default Layout;