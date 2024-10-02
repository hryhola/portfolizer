import { getTopUsers } from '@/lib/firebase/admin/db'
import { SimpleUserCard } from './simpleUserCard'

export const TopUsers: React.FC = async () => {
    const users = await getTopUsers()

    return users.map(u => <SimpleUserCard key={u.uid} {...u} />)
}
