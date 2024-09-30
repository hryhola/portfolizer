import { getTopUsers } from '@/lib/firebase/admin/db';
import { SimpleUserCard } from './simpleUserCard';

interface TopUsersProps {}

export const TopUsers: React.FC<TopUsersProps> = async (props) => {
    const users = await getTopUsers();

    return users.map(u => <SimpleUserCard {...u} />);
}
