import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return <>
        <Skeleton className='w-full h-20' />
        <div className='container mx-auto px-5 pt-5'>
            <Skeleton className='w-1/3 min-w-40 h-7' />
            <div className='sm:flex sm:justify-between space-y-5'>
                <div>
                    <div className='py-6 flex gap-1 items-center'>
                        <Skeleton className='w-6 h-6 rounded-full' />
                        <Skeleton className='w-40 h-4' />
                    </div>
                    <div className='space-y-2'>
                        <Skeleton className='w-40 h-4' />
                        <Skeleton className='w-44 h-4' />
                        <Skeleton className='w-40 h-4' />
                        <Skeleton className='w-44 h-4' />
                    </div>
                </div>
                <div>
                    <div className='space-y-2 sm:flex sm:flex-col sm:items-end'>
                        <Skeleton className='w-40 h-4' />
                        <Skeleton className='w-44 h-4' />
                        <Skeleton className='w-40 h-4' />
                        <Skeleton className='w-44 h-4' />
                    </div>
                </div>
            </div>
            <Skeleton className='mt-5 p-5 w-full bg-white flex justify-center gap-5'>
                <Skeleton className='w-20 h-4' />
                <Skeleton className='w-20 h-4' />
                <Skeleton className='w-20 h-4' />
            </Skeleton>
            <div className='flex justify-center py-5'>
                <Skeleton className='w-44 h-4' />
            </div>
            <Skeleton className='w-full border-b-0 h-px' />
            <div className='flex justify-center pt-5'>
                <Skeleton className='w-44 h-4' />
            </div>
            <div className='pt-5 space-y-5'>
                <Skeleton className='w-44 h-4' />
                <Skeleton className='w-48 h-4' />
                <Skeleton className='w-44 h-4' />
                <Skeleton className='w-48 h-4' />
                <Skeleton className='w-44 h-4' />
                <Skeleton className='w-40 h-4' />
            </div>
        </div>
    </>
}
