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
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"


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

interface EditUserDetailsProps { }

export const EditUserDetails: React.FC<EditUserDetailsProps> = (props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: 'someuserId12',
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return <Dialog>
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
                    <FormField
                        control={form.control}
                        name="id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>User ID <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input disabled className="" placeholder="id" {...field} />
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
                                <FormControl>
                                    <Input onBlur={field.onBlur} onChange={(e) => e.target.files && field.onChange(e.target.files[0])} type="file" accept="image/*" className="border-black" />
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
                </form>
            </Form>
            <DialogFooter className="px-6">
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>;
}
