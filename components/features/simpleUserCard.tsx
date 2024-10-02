import Image from 'next/image'
import Link from 'next/link'

interface SimpleUserCardProps {
    id: string
    name: string
    imageSrc?: string
    publishedProjectsCount?: number
}

export const SimpleUserCard: React.FC<SimpleUserCardProps> = (props) => {
    const projectsCount = props.publishedProjectsCount || 0

    return <div className='border border-black rounded overflow-hidden min-w-64 shadow-lg'>
        {props.imageSrc
            ? <Image className='w-full' src={props.imageSrc} width={272} height={272} alt='Profile Picture' />
            : <div className='text-6xl p-10 text-center'>😎</div>}
        <p className='px-2 flex gap-5 flex-wrap justify-between items-center border-t border-black'>
            <Link className='hover:underline text-2xl ' href={`/${props.id }`}>
                {props.name}
            </Link>
            <span>{projectsCount} {projectsCount > 1 ? 'projects' : 'project'}</span>
        </p>
    </div>
}
