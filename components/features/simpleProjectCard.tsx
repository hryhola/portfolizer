import { getUser, ProjectData } from '@/lib/firebase/admin/db';
import Image from 'next/image';
import Link from 'next/link';

type SimpleProjectCardProps = ProjectData

export const SimpleProjectCard: React.FC<SimpleProjectCardProps> = async (props) => {
    const author = (await getUser({ uid: props.authorUid }))!

    return <div className='border border-black rounded overflow-hidden min-w-96 min-h-52 flex flex-col'>
        <h3 className='text-2xl p-2 border-b border-gray-600'>
            <Link className='hover:underline' href={`/${author.id}/${props.id}`}>
                {props.name}
            </Link>
        </h3>
        <p className='px-2 flex justify-between border-b border-black'>
            <span>
                by <Link className='hover:underline' href={`/${author.id}`}>{author.name}</Link>
            </span>
            {typeof props.timeTotal === 'number'
                ? <span>{props.timeTotal} {props.timeTotal > 1 ? 'hours' : 'hour'}</span>
                : <></>}
        </p>
        {props.headerImageSrc
            ? <Image className='w-full max-w-[500px] min-h-52 object-center object-cover' src={props.headerImageSrc} width={500} height={272} alt='Project Picture' />
            : <div className='text-6xl flex-grow grid place-items-center'>📝</div>}
    </div>;
}
