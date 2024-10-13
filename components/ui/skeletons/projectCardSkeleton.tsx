import { Skeleton } from '../skeleton'

export const ProjectCardSkeleton = () => {
    return <Skeleton className='h-52 p-5'>
        <Skeleton className='w-32 h-6 bg-gray-200 rounded border-none' />
        <div className='space-y-1 pt-5'>
            <Skeleton className='w-20 h-5 bg-gray-200 rounded border-none' />
            <Skeleton className='w-20 h-5 bg-gray-200 rounded border-none' />
            <Skeleton className='w-20 h-5 bg-gray-200 rounded border-none' />
        </div>
    </Skeleton>
}