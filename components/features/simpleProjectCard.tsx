import Image from 'next/image';
import Link from "next/link";

interface SimpleProjectCardProps {
    id: string
    name: string
    authorName: string
    authorId: string
    totalHours?: number
    imageSrc?: string
}

export const SimpleProjectCard: React.FC<SimpleProjectCardProps> = (props) => {
    return <div className="border border-black rounded overflow-hidden min-w-96 min-h-52">
        <h3 className="text-2xl p-2 border-b border-gray-600">
            <Link className="hover:underline" href={`/${props.authorId}/${props.id}`}>
                {props.name}
            </Link>
        </h3>
        <p className="px-2 flex justify-between border-b border-black">
            <span>
                by <Link className="hover:underline" href={`/${props.authorId}`}>{props.authorName}</Link>
            </span>
            {typeof props.totalHours === 'number'
                ? <span>{props.totalHours} {props.totalHours > 1 ? 'hours' : 'hour'}</span>
                : <></>}
        </p>
        {props.imageSrc
            ? <Image className="w-full" src={props.imageSrc} width={272} height={272} alt='Project Picture' />
            : <></>}
    </div>;
}
