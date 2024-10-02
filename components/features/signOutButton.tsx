'use client'

import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/firebase/client/auth'
import { Button } from '../ui/button'
import { useToast } from '@/hooks/use-toast'

export const SignOutButton: React.FC = () => {
    const router = useRouter()
    const { toast } = useToast()

    const handleSignOut = async () => {
        const result = await signOut()

        if (result.success) {
            router.refresh()
        } else {
            toast({
                title: 'Sign Out Error',
                description: result.error || 'Something went wrong',
                variant: 'destructive'
            })
        }
    }

    return <Button onClick={handleSignOut} variant='link'>Sign Out</Button>
}
