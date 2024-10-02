import { HeroBanner } from '@/components/features/heroBanner';
import { TopProjects } from '@/components/features/topProjects';
import { TopUsers } from '@/components/features/topUsers';

export default function Home() {
    return (
        <div className='min-h-[90vh]'>
            <HeroBanner className='h-[33vh]' />
            <div className='flex flex-wrap justify-center items-center gap-5 p-5'>
                <TopUsers />
                <TopProjects />
            </div>
        </div>
    );
}
