'use client'
import { useRouter } from 'next/navigation'
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
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { signInWithEmail, signInWithProvider } from '@/lib/firebase/client/auth'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
    email: z.string().email().min(1).max(50),
    password: z.string().min(5).max(50)
})

export const LoginForm: React.FC = () => {
    const toast = useToast()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formError, setFormError] = useState('')
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        const result = await signInWithEmail(values.email, values.password)

        setIsLoading(false)

        if (result.success) {
            toast.toast({
                title: `Logged in as ${values.email}`,
                description: 'Redirecting...'
            })
            router.refresh()
            return
        }

        setFormError(result.error || 'Something went wrong')
    }

    const createProviderSignInHandler = (provider: 'google' | 'github') => async () => {
        setIsLoading(true)

        const result = await signInWithProvider(provider)

        console.log(result)

        setIsLoading(false)

        if (result.success) {
            toast.toast({
                title: `Logged in${'email' in result && result.email ?
                    ' as ' + result.email
                    : ''}`,
                description: 'Redirecting...'
            })

            router.refresh()
        } else {
            setFormError(result.error || 'Something went wrong')
        }
    }

    return <Form {...form}>
        <form className='space-y-4 border border-gray-500 rounded-xl p-5 shadow-lg' onSubmit={form.handleSubmit(onSubmit)}>
            <h1 className='text-5xl'>Login</h1>
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
            <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input className='border-black'
                                type='password'
                                placeholder='password'
                                autoComplete='current-password'
                                disabled={isLoading}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {formError && <p className='text-sm text-destructive'>{formError}</p>}
            <div className='flex items-stretch gap-2'>
                <Button className='shadow-md shadow-gray-500' disabled={isLoading} type='submit'>Login</Button>
                <Button className='shadow-md ' disabled={isLoading} type='button' variant='outline' onClick={createProviderSignInHandler('google')}>
                    <FcGoogle size={30} />
                </Button>
                <Button className='shadow-md ' disabled={isLoading} type='button' variant='outline' onClick={createProviderSignInHandler('github')}>
                    <FaGithub size={30} />
                </Button>
            </div>
        </form>
    </Form>
}
