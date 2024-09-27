'use client';

import React, { useRef } from 'react'
import { Button } from '@/components/ui/button';
import { useSearchParams, useRouter } from 'next/navigation';

interface EditApproveButtonsProps {
    published: boolean
}

export const EditApproveButtons: React.FC<EditApproveButtonsProps> = (props) => {
    const publishCheckboxRef = useRef<HTMLInputElement>(null)
    const submitButtonRef = useRef<HTMLInputElement>(null)

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleCancel = () => {
        const query = new URLSearchParams(searchParams.toString())

        query.delete('mode')
      
        const newUrl = `${window.location.pathname}?${query.toString()}`;

        router.push(newUrl)
    }

    const handlePublish = () => {
        if (!publishCheckboxRef.current || !submitButtonRef.current) {
            return;
        }

        publishCheckboxRef.current.checked = !props.published
        submitButtonRef.current.click()
    }

    return <div className='fixed z-50 w-full flex top-5 gap-5 justify-center pointer-events-none'>
        <Button className='pointer-events-auto' variant='outline' type='button' onClick={handleCancel}>Cancel</Button>
        {props.published && <Button className='pointer-events-auto' variant='outline' type='submit' onClick={handlePublish}>Save & Unpublish</Button>}
        <Button className='pointer-events-auto' type='submit' ref={submitButtonRef as any}>Save</Button>
        {!props.published && <Button className='pointer-events-auto' onClick={handlePublish} type="button">Save & Publish</Button>}
        <input className='hidden' type='checkbox' defaultChecked={props.published} name='published' ref={publishCheckboxRef} />
    </div>;
}
