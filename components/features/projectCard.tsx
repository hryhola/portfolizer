import Link from 'next/link';
import React from 'react'
import { ComplexityLevelValue } from './project/complexityLevel';
import { cn } from '@/lib/utils';
import { MdAccessTime, MdSignalCellular1Bar, MdSignalCellular2Bar , MdSignalCellular4Bar } from 'react-icons/md';

export interface ProjectCardProps {
    authorId: string
    id: string
    name: string
    client?: string
    totalHours?: number
    totalComplexity?: ComplexityLevelValue
    dateCreated?: Date
    frameworks: string[]
    published: boolean
}

export const ProjectCard: React.FC<ProjectCardProps> = (props) => {
    
    return <div style={{ backgroundImage: "url('/images/image_25.png')" }}
        className='bg-cover bg-center flex justify-between min-h-32 border border-black rounded overflow-hidden'
    >
        <div className='bg-white min-w-44 p-5'>
            {!props.published && <p className='uppercase font-italic tracking-[-2px] font-bold text-sm'>unpublished</p>}
            <h3 className='text-2xl'>
                <Link className='hover:underline' href={props.authorId + '/' + props.id}>
                    {props.name}
                </Link>
            </h3>
            
            {typeof props.totalHours === 'number'
                ? <p><MdAccessTime className='inline relative top-[-2px]' /> {props.totalHours} {props.totalHours > 1 ? 'hours' : 'hour'}</p>
                : <></>}
            {props.totalComplexity && <p>
                {props.totalComplexity === 'High' && <MdSignalCellular4Bar className='inline relative top-[-2px]' />}
                {props.totalComplexity === 'Medium' && <MdSignalCellular2Bar className='inline relative top-[-2px]' />}
                {props.totalComplexity === 'Low' && <MdSignalCellular1Bar className='inline relative top-[-2px]' />}
                &nbsp;
                {props.totalComplexity} Complexity
            </p>}
            <p>{props.client}</p>
        </div>
        <div className='bg-gradient-to-l w-1/2 md:w-1/4 from-white grid justify-end text-right p-5'>
            {props.frameworks.length ? <ul className=''>
                {props.frameworks.map(f => <li key={f}>{f}</li>)}
            </ul> : <></>}
            <p className={cn({ 'self-end': props.frameworks.length }, 'font-italic tracking-[-4px] opacity-60')}>{props.dateCreated && props.dateCreated.getFullYear()}</p>
        </div>
    </div>;
}
