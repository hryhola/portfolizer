'use client';

import React, { FormEventHandler, createContext, useContext, useRef, useState } from 'react'
import { StackData } from './stackBlock';
import { ComplexityLevelData } from './complexityLevelsBlock';
import { LinkData } from './linksBlock';
import { TimeData } from './timeSpentChart';
import { FeatureData } from './features';
import { PhotosData } from './projectPhotos';
import { ProjectData } from '@/lib/firebase/admin/db';
import { packRecords } from '@/lib/object';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { updateProject } from '@/lib/firebase/client/db';

const FormContext = createContext<{
    stack: StackData[]
    setStack: React.Dispatch<React.SetStateAction<StackData[]>>
    complexity: ComplexityLevelData[]
    setComplexity: React.Dispatch<React.SetStateAction<ComplexityLevelData[]>>
    links: LinkData[]
    setLinks: React.Dispatch<React.SetStateAction<LinkData[]>>
    time: TimeData[]
    setTime: React.Dispatch<React.SetStateAction<TimeData[]>>
    features: FeatureData[]
    setFeatures: React.Dispatch<React.SetStateAction<FeatureData[]>>
    photos: (PhotosData & { file?: File })[]
    setPhotos: React.Dispatch<React.SetStateAction<PhotosData[]>>
}>(null!)

export const useProjectContext = () => useContext(FormContext)

interface ProjectFormWrapperProps {
    children: JSX.Element | JSX.Element[]
    id: string
    uid: string
    stack: StackData[]
    complexity: ComplexityLevelData[]
    links: LinkData[]
    time: TimeData[]
    features: FeatureData[]
    photos: PhotosData[]
}

export const ProjectFormWrapper: React.FC<ProjectFormWrapperProps> = (props) => {
    const [stack, setStack] = useState([...props.stack].sort((a, b) => a.order - b.order))
    const [complexity, setComplexity] = useState([...props.complexity].sort((a, b) => a.order - b.order))
    const [links, setLinks] = useState([...props.links.sort((a,b) => a.order - b.order)])
    const [time, setTime] = useState(props.time)
    const [features, setFeatures] = useState(props.features)
    const [photos, setPhotos] = useState(props.photos)

    const formRef = useRef<HTMLFormElement>(null)

    const toast = useToast()
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const formData = new FormData(formRef.current!);

        const name = formData.get('name');

        if (typeof name !== 'string') {
            return
        }

        const project: Partial<ProjectData> = {
            name: name,
            date: formData.get('date') ? new Date(formData.get('date') as string) : undefined,
            features: features.map(f => ({  
                ...f,
                text: formData.get(`feature-${f.id}-text`) as string | null || ''
            })),
            description: formData.get('description') as string | null || '',
            timeTotal: formData.get('timeTotal') ? Number(formData.get('timeTotal')) : undefined,
            client: formData.get('client') as string | null || '',
            stack: packRecords(stack),
            complexity: packRecords(complexity),
            time: packRecords(time.map(t => ({
                ...t,
                details: formData.get(`time-${t.id}-details`) as string | null || ''
            }))),
            links: links,
            published: formData.get('published') === 'on'
            // headerPicture: formData.get('headerPicture'),
            // photos,
        }


        const result = await updateProject(props.uid, project);

        if (!result.success) {
            toast.toast({
                title: 'Cannot update project',
                description: result.error || 'Something went wrong'
            })
        
            return
        }

        toast.toast({ title: `Project ${props.id} updated` })
    
        const query = new URLSearchParams(searchParams.toString())
        query.delete('mode')
        const newUrl = `${window.location.pathname}?${query.toString()}`;

        router.push(newUrl)
        router.refresh()
    }

    return <FormContext.Provider value={{
        stack,
        setStack,
        complexity,
        setComplexity,
        links,
        setLinks,
        time,
        setTime,
        features,
        setFeatures,
        photos,
        setPhotos
    }} >
        <form onSubmit={handleSubmit} ref={formRef}>{props.children}</form>
    </FormContext.Provider>;
}
