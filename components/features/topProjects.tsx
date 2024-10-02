import { getTopProjects } from '@/lib/firebase/admin/db';
import { SimpleProjectCard } from './simpleProjectCard';

export const TopProjects: React.FC = async () => {
    const topProjects = await getTopProjects()

    return topProjects.map(p => <SimpleProjectCard key={p.uid} {...p}/>);
}
