import { Skeleton } from '../skeleton'
import { ProjectCardSkeleton } from './projectCardSkeleton'

export const ProjectsListSkeleton = () => {
    return <>
        <Skeleton className='w-full h-10' />
        <div className='space-y-5 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-5'>
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
        </div>
    </>
}
