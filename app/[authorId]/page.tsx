import { UserBlock } from '@/components/features/userBlock'
import { UserProjectsList } from '@/components/features/userProjectsList'
import { getUser } from '@/lib/firebase/admin/db'
import { notFound } from 'next/navigation'

type Page = {
    searchParams: { mode: string },
    params: { authorId: string }
}

export default async function Page(page: Page) {
    const user = await getUser({ id: page.params.authorId })

    if (!user) {
        return notFound()
    }

    return <div className='container mx-auto px-5 my-5 space-y-5'>
        <UserBlock {...user} />
        <UserProjectsList user={user} />
    </div> 
}
