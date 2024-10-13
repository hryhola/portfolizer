import { Skeleton } from '../skeleton'

export const SimpleCardSkeleton = () => {
    return <div className='flex flex-col gap-5'>
        <Skeleton className='h-72 w-60' />
        <div className='flex gap-5'>
            <Skeleton className='h-6 grow' />
            <Skeleton className='h-6 w-10' />
        </div>
    </div>
}
