import { Skeleton } from '@/components/ui/skeleton'
import { ProjectsListSkeleton } from '@/components/ui/skeletons/projectsListSkeleton'

export default function Loading() {
    return <div className='container mx-auto px-5 my-5 space-y-5'>
        <div className='flex justify-between flex-wrap items-center'>
            <Skeleton className='w-60 h-11' />
        </div>
        <div className='flex flex-wrap sm:flex-nowrap gap-5'>
            <Skeleton className='w-60 h-56' />
            <div className='space-y-5'>
                <Skeleton className='w-52 h-5' />
                <Skeleton className='w-52 h-5' />
                <Skeleton className='w-52 h-5' />
                <Skeleton className='w-52 h-5' />
                <div className='flex gap-5'>
                    <Skeleton className='w-20 h-5' />
                    <Skeleton className='w-20 h-5' />
                    <Skeleton className='w-20 h-5' />
                </div>
            </div>
        </div>
        <ProjectsListSkeleton />
    </div>
}