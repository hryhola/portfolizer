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

const formSchema = z.object({
    id: z.string().min(1).max(50),
    name: z.string().min(1).max(50),
    email: z.string().email().min(1).max(50),
    password: z.string().min(5).max(50),
    passwordConfirm: z.string().min(5).max(50)
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
                name="id"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <Input className="border-black" type='email' placeholder="your@email.example" {...field} />
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
