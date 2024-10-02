'use client'

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { createProject, isProjectIdAvailable } from '@/lib/firebase/client/db'
import { IoAddOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
    id: z.string().regex(/^[0-9a-zA-Z-_]+$/).min(1).max(50)
})

interface AddProjectProps {
    authorId: string
    authorUid: string
    className?: string
}

export const AddProject: React.FC<AddProjectProps> = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const toast = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        const isAvailable = await isProjectIdAvailable(props.authorUid, values.id)

        if (!isAvailable) {
            setIsLoading(false)
            form.setError('id', { message: 'This project id is not available' })
            return
        }

        const result = await createProject(props.authorUid, values.id)

        if (!result.success) {
            form.setError('id', { message: result.error })
            setIsLoading(false)
            return
        }

        setIsLoading(false)

        toast.toast({
            title: `Created project ${values.id}`,
            description: 'Redirecting...'
        })
    
        router.push(`${props.authorId}/${values.id}?mode=edit`)
    }

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className='border-gray-500' variant='outline'>
                <IoAddOutline className='mr-2' />
                Add Project
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Project</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form className={cn('flex', props.className)} onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='id'
                        render={({ field }) => (
                            <FormItem className='w-full flex-grow'>
                                <FormControl>
                                    <Input className='border-gray-500 rounded-r-none w-full'
                                        placeholder='New Project ID'
                                        disabled={isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className='rounded-l-none'
                        type='submit'
                        disabled={isLoading}
                    >Add</Button>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
}
