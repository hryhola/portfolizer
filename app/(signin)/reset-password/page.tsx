import { ResetPasswordForm } from '@/components/features/user/resetPasswordForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Password reset — Portfolizer',
}

export default function Page() {
    return <div className='space-y-5'>
        <ResetPasswordForm />
    </div>
}
