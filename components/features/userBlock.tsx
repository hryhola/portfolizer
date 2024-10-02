import Image from 'next/image';
import { FaTelegramPlane, FaGithub, FaLinkedin } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { AddProject } from './addProject';
import { EditUserDetails } from './editUserDetails';
import { getCurrentUser } from '@/lib/firebase/admin/session';
import { SignOutButton } from './signOutButton';

interface UserBlockProps {
    id: string
    name: string
    bio?: string
    imageSrc?: string
    email?: string
    phoneNumber?: string
    twitterId?: string
    telegramId?: string
    linkedInId?: string
    githubId?: string

}

const UserLink: React.FC<{ href: string, icon: JSX.Element, id?: string }> = (props) => {
    if (!props.id) return <></>

    return <li className='whitespace-nowrap'>
        <a className='flex items-center hover:underline' href={props.href}>
            <div className='mr-2'>
                {props.icon}
            </div>
            {props.id}
        </a>
    </li>
}

export const UserBlock: React.FC<UserBlockProps> = async (props) => {
    const currentUser = await getCurrentUser()

    const hasAnyLink = props.phoneNumber ||
        props.email ||
        props.githubId ||
        props.twitterId ||
        props.linkedInId ||
        props.telegramId

    const hasAnyDetails = hasAnyLink ||
        props.bio ||
        props.imageSrc

    const isCurrentUserPage = currentUser && currentUser.id === props.id

    return <>
        <div className='flex justify-between items-center'>
            <h1 className='text-5xl font-bold'>{props.name}</h1>
            {isCurrentUserPage && <SignOutButton />}
        </div>
        {(isCurrentUserPage || hasAnyDetails) && (
        <div className='flex flex-wrap sm:flex-nowrap gap-5'>
            {props.imageSrc && <Image className='w-full sm:w-auto border border-black rounded object-cover' src={props.imageSrc} width={272} height={272} alt='Profile Picture' />}
            <div className='grid gap-5'>
                {props.bio && <p className='whitespace-pre-wrap'>{props.bio}</p>}
                {hasAnyLink && <ul className='flex flex-wrap gap-5 justify-between'>
                    <UserLink id={props.email} href={`mailto:${props.email}`} icon={<MdEmail className='relative top-px' size={14} />} />
                    <UserLink id={props.phoneNumber} href={`tel:${props.phoneNumber}`} icon={<BsFillTelephoneFill size={14} />} />
                    <UserLink id={props.githubId} href={`https://github.com/${props.githubId}/`} icon={<FaGithub size={14} />} />
                    <UserLink id={props.twitterId} href={`https://x.com/${props.twitterId}/`} icon={<FaXTwitter size={14} />} />
                    <UserLink id={props.linkedInId} href={`https://www.linkedin.com/in/${props.linkedInId}/`} icon={<FaLinkedin size={14} />} />
                    <UserLink id={props.telegramId} href={`https://t.me/${props.telegramId}/`} icon={<FaTelegramPlane size={14} />} />
                </ul>}
                {isCurrentUserPage && <div className='self-end flex flex-col-reverse md:flex-row gap-5 justify-between'>
                    <AddProject authorUid={currentUser.uid} authorId={currentUser.id} />
                    <EditUserDetails providers={currentUser.providers} uid={currentUser.uid} {...props} />
                </div>}
            </div>
        </div>)}
    </>;
}
