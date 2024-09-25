import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/firebase/admin/session";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeroBannerProps {
    className?: string
}

export const HeroBanner: React.FC<HeroBannerProps> = async (props) => {
    const currentUser = await getCurrentUser()

    return <div className={cn("flex flex-col justify-center items-center gap-10 border-gray-500 border-b px-5", props.className)}>
        <h1 className="text-5xl text-center">Show Your Portfolio Everyone</h1>
        {!currentUser && <div className="flex gap-5">
            <Link href='/login'>
                <Button>Login</Button>
            </Link>
            <Link href='/register'>
                <Button>Register</Button>
            </Link>
        </div>}
    </div>;
}
