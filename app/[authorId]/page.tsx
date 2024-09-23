'use client'

import { ProjectsList } from '@/components/features/projectsList';
import { UserBlock } from '@/components/features/userBlock';

type Page = {
    searchParams: { mode: string },
    params: { authorId: string }
}

export default function Page(page: Page) {
    const user = {
        name: 'Vlad Hryhola',
        bio: 'Hello! I’m someone and this is stuff I did. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor porttitor tortor, vitae tincidunt ex tristique vitae. In vitae arcu lacus. Cras rutrum nibh nisi, et egestas quam molestie in',
        imageSrc: '/images/Dude.webp',
        phoneNumber: '+380669876543',
        twitterId: 'Dude',
        telegramId: 'TgId',
        linkedInId: 'linked-in',
        githubId: 'somedude',
    }

    return <div className='container mx-auto px-5 my-5 space-y-5'>
        <UserBlock {...user} />
        <ProjectsList author='username' />
    </div>; 
}
