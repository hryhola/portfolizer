import { LoginForm } from '@/components/features/user/loginForm'
import Link from 'next/link'

export default async function Page() {
    return <div className='space-y-5'>
        <LoginForm />
        <p className='text-center'>Don&apos;t have an account? <Link className='hover:underline font-bold' href='/register'>Register</Link></p>
    </div> 
}
