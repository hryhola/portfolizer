import Image from 'next/image';
import Link from "next/link";

interface SimpleUserCardProps {
    imageSrc: string
    id: string
    name: string
    projectsAmount: number
}

export const SimpleUserCard: React.FC<SimpleUserCardProps> = (props) => {
    return <div className="border border-black rounded overflow-hidden">
        <Image className='w-full sm:w-auto' src={props.imageSrc} width={272} height={272} alt='Profile Picture' />
        <p className="px-2 flex flex-wrap justify-between items-center border-t border-black">
            <Link className="hover:underline text-2xl " href='/dude12'>
                {props.name}
            </Link>
            <span>{props.projectsAmount} {props.projectsAmount > 1 ? 'projects' : 'project'}</span>
        </p>
    </div>;
}
