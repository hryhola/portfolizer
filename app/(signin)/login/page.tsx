import { LoginForm } from '@/components/features/user/loginForm'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Login — Portfolizer',
}

export default async function Page() {
    return <div className='space-y-5'>
        <LoginForm />
        <p className='text-center'>Don&apos;t have an account? <Link className='hover:underline font-bold' href='/register'>Register</Link></p>
    </div> 
}
