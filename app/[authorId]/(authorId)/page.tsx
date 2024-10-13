import { UserBlock } from '@/components/features/userBlock'
import { UserProjectsList } from '@/components/features/userProjectsList'
import { ProjectsListSkeleton } from '@/components/ui/skeletons/projectsListSkeleton'
import { getUser } from '@/lib/firebase/admin/db'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

type Page = {
    params: { authorId: string }
}

export async function generateMetadata({ params }: Page): Promise<Metadata> {
    const user = await getUser({ id: params.authorId })

    if (!user) {
        return {}
    }

    return {
        title: `${user.name} | Portfolizer`,
        description: user.bio,
        openGraph: {
            images: user.imageSrc ? [user.imageSrc] : [],
        },
    }
}

export default async function Page(page: Page) {
    const user = await getUser({ id: page.params.authorId })

    if (!user) {
        return notFound()
    }

    return <div className='container mx-auto px-5 my-5 space-y-5'>
        <UserBlock {...user} />
        <Suspense fallback={<ProjectsListSkeleton />}>
            <UserProjectsList user={user} />
        </Suspense>
    </div>
}
