import { getUserProjects, UserData } from '@/lib/firebase/admin/db'
import { ProjectCardProps } from './projectCard'
import { ProjectsList } from './projectsList'
import { getAverageComplexity } from '@/lib/utils'
import { getCurrentUser } from '@/lib/firebase/admin/session'

interface UserProjectsListProps {
    user: UserData
}

export const UserProjectsList: React.FC<UserProjectsListProps> = async (props) => {
    const currentUser = await getCurrentUser()
    const userProjects = await getUserProjects(props.user, props.user.uid === currentUser?.uid)

    const projectCardsData: ProjectCardProps[] = userProjects.map(p => ({
        id: p.id,
        client: p.client,
        dateCreated: p.date,
        authorId: props.user.id,
        name: p.name,
        totalComplexity: getAverageComplexity(p),
        totalHours: p.timeTotal,
        frameworks: p.stack
            ? Object.values(p.stack)
                .sort((a,b) => a.order - b.order)
                .reduce(
                    (acc, curr) => acc.includes(curr.value) ? acc : [...acc, curr.value],
                    [] as string[]
                )
            : [],
        published: p.published,
        headerImageSrc: p.headerImageSrc
    }))

    return <ProjectsList projects={projectCardsData} />
}
