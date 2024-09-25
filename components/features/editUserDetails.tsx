'use client'

import { BiSolidPencil } from "react-icons/bi"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { FaTelegramPlane, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"
import type { UserData } from "@/lib/firebase/admin/db"
import { useState } from "react"
import Image from 'next/image'
import { updateUser } from "@/lib/firebase/client/db"
import { useRouter } from "next/navigation"
import type { UserInfo } from 'firebase-admin/auth'
import { LinkProvidersButton } from "./user/linkProvidersButton"

const MAX_FILE_SIZE = 5000000;

const formSchema = z.object({
    id: z.string().min(1).max(50),
    name: z.string().min(1).max(50),
    bio: z.string().max(300).optional(),
    phoneNumber: z.string().max(20).optional(),
    twitterId: z.string().max(100).optional(),
    telegramId: z.string().max(100).optional(),
    linkedInId: z.string().max(100).optional(),
    githubId: z.string().max(100).optional(),
    image: z.any().refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`).optional()
})

type EditUserDetailsProps = {
        uid: string
        providers: {
            github?: UserInfo
            google?: UserInfo
        }
    } & UserData

export const EditUserDetails: React.FC<EditUserDetailsProps> = (props) => {
    const { imageSrc, uid, ...userDataWithoutImage } = props;

    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [imagePreviewSrc, setImagePreviewSrc] = useState(imageSrc)

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: userDataWithoutImage
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setErrorMessage('')

        const { image, ...updatedFields } = values;

        const result = await updateUser(props.uid, updatedFields, { existCheck: 'errorIfNot' });

        if (result.success) {
            setOpen(false)

            if (props.id !== updatedFields.id) {
                router.push('/' + updatedFields.id)
            } else {
                router.refresh();
            }
        } else {
            setErrorMessage(result.error || 'Something went wrong');
        }
    }

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className='border-gray-500' variant='outline'>
                <BiSolidPencil className='mr-2' />
                Edit My Page
            </Button>
        </DialogTrigger>
        <DialogContent className="px-0">
            <DialogHeader className="px-6">
                <DialogTitle>Edit profile</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form className="space-y-2 px-6 max-h-[80vh] overflow-y-scroll" onSubmit={form.handleSubmit(onSubmit)}>
                    <LinkProvidersButton providers={props.providers} />
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
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Picture</FormLabel>
                                {imagePreviewSrc && <Image className="object-fit border border-black rounded" src={imagePreviewSrc} width={128} height={128} alt="Profile Picture Preview"/>}
                                <FormControl>
                                    <Input
                                        onBlur={field.onBlur}
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                field.onChange(e.target.files[0]);
                                                setImagePreviewSrc(URL.createObjectURL(e.target.files[0]))
                                            }
                                        }}
                                        type="file"
                                        accept="image/*"
                                        className="border-black"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                    <Textarea className="border-black" placeholder="Tell about yourself" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <BsFillTelephoneFill className="inline relative bottom-0.5" size={16} /> Phone Number
                                </FormLabel>
                                <FormControl>
                                    <Input className="border-black" placeholder="(555) 255-8475" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="githubId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><FaGithub className="inline relative bottom-0.5" size={16} /> GitHub ID</FormLabel>
                                <FormControl>
                                    <Input className="border-black" placeholder="githubId" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="linkedInId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><FaLinkedin className="inline relative bottom-0.5" size={16} /> LinkedIn ID</FormLabel>
                                <FormControl>
                                    <Input className="border-black" placeholder="linkedInId" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="telegramId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><FaTelegramPlane className="inline relative bottom-0.5" size={16} /> Telegram ID</FormLabel>
                                <FormControl>
                                    <Input className="border-black" placeholder="telegramId" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="twitterId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><FaXTwitter className="inline relative bottom-0.5" size={16} /> ID</FormLabel>
                                <FormControl>
                                    <Input className="border-black" placeholder="xId" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>;
}
