'use client'

import { AlertDialogHeader, AlertDialogFooter } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { useRouter, useSearchParams } from 'next/navigation';
import { deleteProject } from '@/lib/firebase/client/db';
import { useToast } from '@/hooks/use-toast';

interface PreEditButtonsProps {
    projectName: string
    projectId: string
    authorId: string
    projectUid: string
}

export const PreEditButtons: React.FC<PreEditButtonsProps> = (props) => {
    const toast = useToast()
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleEdit = () => {
        const query = new URLSearchParams(searchParams.toString())

        query.append('mode', 'edit')

        const newUrl = `${window.location.pathname}?${query.toString()}`;

        router.replace(newUrl)
    }

    const handleDelete = async () => {
        const result = await deleteProject(props.projectUid);

        if (!result.success) {
            toast.toast({
                variant: 'destructive',
                title: 'Deletion of project ' + props.projectId,
                description: result.error || 'Something went wrong'
            })

            return;
        }

        toast.toast({
            description: 'Deleted project ' + props.projectId
        })

        router.push('/' + props.authorId);
        router.refresh()
    }

    return <div className='flex justify-between mt-5'>
        <Button variant='outline' className='border-gray-400'  onClick={handleEdit}>Edit</Button>
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='border-destructive/50 hover:border-destructive/100 text-destructive/75 hover:text-destructive/100' variant='outline'>
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete {props.projectId} project?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will <span className='text-black'>permanently delete <b>{props.projectName}</b></span> ({props.projectId}) project.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>Confirm Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>;
}
