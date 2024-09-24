'use client';

import React from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { cn } from '@/lib/utils';

const formSchema = z.object({
    id: z.string().min(1).max(50)
})

interface AddProjectFormProps {
    className?: string
}

export const AddProjectForm: React.FC<AddProjectFormProps> = (props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return <Form {...form}>
        <form className={cn('flex', props.className)} onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                        <FormItem className='w-full flex-grow'>
                            <FormControl>
                                <Input className="border-gray-500 rounded-r-none w-full" placeholder="New Project ID" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            <Button className='rounded-l-none'>Add</Button>
        </form>
    </Form>;
}
