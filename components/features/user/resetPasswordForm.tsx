'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { sendResetPasswordEmail } from '@/lib/firebase/client/auth'
import { useState } from 'react'

const formSchema = z.object({
    email: z.string().email().min(1).max(50)
})

export const ResetPasswordForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [formError, setFormError] = useState('')
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        setFormError('')
        setSuccessMessage('')

        const result = await sendResetPasswordEmail(values.email)

        setIsLoading(false)

        if (result.success) {
            setSuccessMessage('Submitted!')
    
            return
        }

        setFormError(result.error || 'Something went wrong')
    }


    return <Form {...form}>
        <form className='space-y-4 border border-gray-500 rounded-xl p-5 shadow-lg' onSubmit={form.handleSubmit(onSubmit)}>
            <h1 className='text-5xl'>Password Reset</h1>
            <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input className='border-black'
                                type='email'
                                placeholder='your@email.example'
                                autoComplete='email'
                                disabled={isLoading}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {successMessage && <p className='text-sm text-lime-600'>{successMessage}</p>}
            {formError && <p className='text-sm text-destructive'>{formError}</p>}
            <Button className='shadow-md shadow-gray-500' disabled={isLoading} type='submit'>Submit</Button>
        </form>
    </Form>
}
