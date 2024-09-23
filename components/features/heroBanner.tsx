import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeroBannerProps {
    className?: string
}

export const HeroBanner: React.FC<HeroBannerProps> = (props) => {
    return <div className={cn("flex flex-col justify-center items-center gap-10 border-gray-500 border-b px-5", props.className)}>
        <h1 className="text-5xl text-center">Show Your Portfolio Everyone</h1>
        <div className="flex gap-5">
            <Link href='/login'>
                <Button>Login</Button>
            </Link>
            <Link href='/register'>
                <Button>Register</Button>
            </Link>
            {/* <Link href='/users'>
                <Button variant='outline'>View Users</Button>
            </Link>
            <Link href='/projects'>
                <Button variant='outline'>View Projects</Button>
            </Link> */}
        </div>
    </div>;
}
