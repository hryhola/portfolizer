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
import { signInWithGoogle } from "@/lib/firebase/client/auth";

const formSchema = z.object({
    username: z.string().min(1).max(50),
    password: z.string().min(5).max(50)
})

interface LoginFormProps {

}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const handleGoogleSignIn = async () => {
        const isOk = await signInWithGoogle();

        if (isOk) router.push("/");
    }

    return <Form {...form}>
        <form className="space-y-4 border border-gray-500 rounded-xl p-5" onSubmit={form.handleSubmit(onSubmit)}>
            <h1 className="text-5xl">Login</h1>
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input className="border-black" placeholder="username" {...field} />
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
                            <Input className="border-black" type='password' placeholder="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="flex items-stretch gap-2">
                <Button type="submit">Login</Button>
                <Button type="button" variant='outline' onClick={handleGoogleSignIn}>
                    <FcGoogle size={30} />
                </Button>
                <Button type="button" variant='outline'>
                    <FaGithub size={30} />
                </Button>
            </div>
        </form>
    </Form>;
}
