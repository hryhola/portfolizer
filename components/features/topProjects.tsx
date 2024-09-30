import { getTopProjects } from '@/lib/firebase/admin/db';
import { SimpleProjectCard } from './simpleProjectCard';

interface TopProjectsProps {}

export const TopProjects: React.FC<TopProjectsProps> = async (props) => {
    const topProjects = await getTopProjects()

    return topProjects.map(p => <SimpleProjectCard {...p}/>);
}
