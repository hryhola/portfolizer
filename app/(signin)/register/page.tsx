import { RegisterForm } from "@/components/features/user/registerForm";
import Link from "next/link";

export default function Page() {
    return <div className="space-y-5">
        <RegisterForm  />
        <p className="text-center">Already have an account? <Link className="font-bold hover:underline" href='/login'>Login</Link></p>
    </div>
}