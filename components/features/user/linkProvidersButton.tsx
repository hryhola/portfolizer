'use client'

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { linkProvider } from '@/lib/firebase/client/auth';
import { UserInfo } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

interface LinkProvidersButtonProps {
    providers: {
        github?: UserInfo
        google?: UserInfo
    }
}

export const LinkProvidersButton: React.FC<LinkProvidersButtonProps> = (props) => {
    const { toast } = useToast()
    const router = useRouter()

    const createLinkHandler = (providerId: 'google' | 'github') => async () => {
        const result = await linkProvider(providerId);

        if (result.success) {
            router.refresh()
    
            toast({
                title: 'Linked new provider to the account'
            })
        
            return;
        }

        toast({
            variant: 'destructive',
            title: 'Error while linking new provider',
            description: result.error || 'Something went wrong'
        })
    }

    return <div className='space-x-2'>
        <Button variant='outline' onClick={createLinkHandler('google')} disabled={!!props.providers.google?.displayName}>
            <FcGoogle size={16} />
            {props.providers.google?.displayName && <span className='ml-2'>{props.providers.google?.displayName}</span>}
        </Button>
        <Button variant='outline' onClick={createLinkHandler('github')} disabled={!!props.providers.github?.displayName}>
            <FaGithub size={16} />
            {props.providers.github?.displayName && <span className='ml-2'>{props.providers.github?.displayName}</span>}
        </Button>
    </div>;
}
