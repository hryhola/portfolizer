'use client';

import React from 'react'
import { Button } from '@/components/ui/button';
import { useSearchParams, useRouter } from 'next/navigation';

interface EditApproveButtonsProps {
}

export const EditApproveButtons: React.FC<EditApproveButtonsProps> = (props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleCancel = () => {
        const query = new URLSearchParams(searchParams.toString())

        query.delete('mode')
      
        const newUrl = `${window.location.pathname}?${query.toString()}`;

        router.push(newUrl)
    }

    return <div className='fixed z-10 w-full flex top-5 gap-5 justify-center'>
        <Button variant='outline' type='button' onClick={handleCancel}>Cancel</Button>
        <Button type='submit'>Save</Button>
    </div>;
}
