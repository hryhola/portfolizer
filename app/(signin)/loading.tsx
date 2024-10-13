import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return <Skeleton className='bg-white p-5 space-y-5'>
        <Skeleton className='w-40 h-10 border-none' />
        <Skeleton className='w-52 h-8 bg-gray-100/25' />
        <Skeleton className='w-52 h-8 bg-gray-100/25' />
        <div className='flex gap-2'>
            <Skeleton className='w-16 h-10 bg-gray-400' />
            <Skeleton className='w-16 h-10' />
            <Skeleton className='w-16 h-10' />
        </div>
    </Skeleton>
}
