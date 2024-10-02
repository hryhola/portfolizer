'use client';
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signInWithEmail, signInWithProvider } from "@/lib/firebase/client/auth";
import { useState } from "react";

const formSchema = z.object({
    email: z.string().email().min(1).max(50),
    password: z.string().min(5).max(50)
})

export const LoginForm: React.FC = () => {
    const router = useRouter()
    const [formError, setFormError] = useState('')
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const result = await signInWithEmail(values.email, values.password);

        if (result.success) {
            router.refresh()
            return;
        }

        setFormError(result.error || 'Something went wrong')
    }

    const createProviderSignInHandler = (provider: 'google' | 'github') => async () => {
        const result = await signInWithProvider(provider);

        if (result.success) {
            router.refresh()
        } else {
            setFormError(result.error || 'Something went wrong')
        }
    }

    return <Form {...form}>
        <form className="space-y-4 border border-gray-500 rounded-xl p-5" onSubmit={form.handleSubmit(onSubmit)}>
            <h1 className="text-5xl">Login</h1>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input className="border-black" type="email" placeholder="your@email.example" autoComplete="email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input className="border-black" type='password' placeholder="password" autoComplete="current-password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {formError && <p className="text-sm text-destructive">{formError}</p>}
            <div className="flex items-stretch gap-2">
                <Button type="submit">Login</Button>
                <Button type="button" variant='outline' onClick={createProviderSignInHandler('google')}>
                    <FcGoogle size={30} />
                </Button>
                <Button type="button" variant='outline' onClick={createProviderSignInHandler('github')}>
                    <FaGithub size={30} />
                </Button>
            </div>
        </form>
    </Form>;
}
