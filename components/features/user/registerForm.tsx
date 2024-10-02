'use client';

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
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { isUserIdAvailable } from '@/lib/firebase/client/db';
import { debounce } from '@/lib/function';
import { registerWithEmail, signInWithProvider } from '@/lib/firebase/client/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
    id: z.string().min(1).max(50).regex(/^[0-9a-zA-Z-_]+$/),
    name: z.string().min(1).max(50),
    email: z.string().email().min(1).max(50),
    password: z.string().min(5).max(50),
    passwordConfirm: z.string().min(5).max(50)
})


export const RegisterForm: React.FC = () => {
    const router = useRouter()
    const toast = useToast()
    const [formError, setFormError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [userIdTaken, setUserIdTaken] = useState<null | boolean>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.password !== values.passwordConfirm) {
            form.setError('passwordConfirm', { message: 'Passwords do not match!' })
            return;
        }

        setIsLoading(true)

        const result = await registerWithEmail(values.id, values.email, values.name, values.password)

        setIsLoading(false)

        if (result.success) {
            toast.toast({
                title: `Registered as ${values.id}`,
                description: 'Redirecting...'
            })

            router.refresh()
            return
        }

        setFormError(result.error || 'Something went wrong')
    }

    const handleUserIdChange = debounce(async () => {
        const id = form.getValues('id')
        const state = form.getFieldState('id');
        const isError = state.error?.message

        if (!id || !/[A-Za-z-_]+/.test(id) || isError || state.invalid) {
            setUserIdTaken(null);
            return
        }

        if (await isUserIdAvailable(id)) {
            setUserIdTaken(false);
        } else {
            setUserIdTaken(true);
        }
    }, 250)

    const createProviderSignInHandler = (provider: 'google' | 'github') => async () => {
        setIsLoading(true)
    
        const result = await signInWithProvider(provider);
        
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
        <form className='space-y-4 border border-gray-500 rounded-xl p-5 max-w-96 shadow-lg' onSubmit={form.handleSubmit(onSubmit)}>
            <h1 className='text-5xl'>
                Register
            </h1>
            <FormField
                control={form.control}
                name='id'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>User ID <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                            <Input className='border-black'
                                {...field}
                                placeholder='id'
                                autoComplete='username'
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e)
                                    handleUserIdChange()
                                }}
                                onBlur={() => {
                                    field.onBlur()
                                    handleUserIdChange()
                                }}
                                disabled={isLoading}
                            />
                        </FormControl>
                        <FormMessage>
                            <span className={cn(userIdTaken === false ? 'text-lime-500' : '')}>
                                {userIdTaken === true && 'User ID taken'}
                                {userIdTaken === false && 'User ID available'}
                            </span>
                        </FormMessage>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                            <Input className='border-black' type='email' placeholder='your@email.example' autoComplete='email' disabled={isLoading} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                            <Input className='border-black' placeholder='name' autoComplete='name' disabled={isLoading} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {}
            <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                            <Input className='border-black' type='password' placeholder='password' autoComplete='new-password' disabled={isLoading} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='passwordConfirm'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirm Password <span className='text-red-500'>*</span></FormLabel>
                        <FormControl>
                            <Input className='border-black' type='password' placeholder='password' autoComplete='new-password' disabled={isLoading} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {formError && <p className='text-sm text-destructive'>{formError}</p>}
            <div className='flex items-stretch gap-2'>
                <Button className='shadow-md shadow-gray-500' disabled={isLoading} type='submit'>Register</Button>
                <Button className='shadow-md' disabled={isLoading} type='button' variant='outline' onClick={createProviderSignInHandler('google')}>
                    <FcGoogle size={30} />
                </Button>
                <Button className='shadow-md' disabled={isLoading} type='button' variant='outline' onClick={createProviderSignInHandler('github')}>
                    <FaGithub size={30} />
                </Button>
            </div>
        </form>
    </Form>;
}
