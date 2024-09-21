'use client';

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
import { Textarea } from "@/components/ui/textarea";

const MAX_FILE_SIZE = 5000000;

const formSchema = z.object({
    id: z.string().min(1).max(50),
    name: z.string().min(1).max(50),
    password: z.string().min(5).max(50),
    passwordConfirm: z.string().min(5).max(50),
    bio: z.string().max(300),
    phoneNumber: z.string().max(20),
    twitterId: z.string().max(100),
    telegramId: z.string().max(100),
    linkedId: z.string().max(100),
    githubId: z.string().max(100),
    image: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    
})

interface RegisterFormProps {

}

export const RegisterForm: React.FC<RegisterFormProps> = (props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return <Form {...form}>
        <form className="space-y-4 border border-gray-500 rounded-xl p-5" onSubmit={form.handleSubmit(onSubmit)}>
            <h1 className="text-5xl">
                Register
            </h1>
            <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>User ID <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <Input className="border-black" placeholder="id" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <Input className="border-black" placeholder="name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {}
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <Input className="border-black" type='password' placeholder="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirm Password <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <Input className="border-black" type='password' placeholder="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="flex items-stretch gap-2">
                <Button type="submit">Register</Button>
                <Button type="button" variant='outline'>
                    <FcGoogle size={30} />
                </Button>
                <Button type="button" variant='outline'>
                    <FaGithub size={30} />
                </Button>
            </div>
        </form>
    </Form>;
}
