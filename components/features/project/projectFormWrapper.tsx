'use client';

import React, { FormEventHandler, createContext, useContext, useRef, useState } from 'react'
import { StackData } from './stackBlock';
import { ComplexityLevelData } from './complexityLevelsBlock';
import { LinkData } from './linksBlock';
import { TimeData } from './timeSpentChart';
import { FeatureData } from './features';
import { PhotosData } from './projectPhotos';

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
    photos: PhotosData[]
    setPhotos: React.Dispatch<React.SetStateAction<PhotosData[]>>
}>(null!)

export const useProjectContext = () => useContext(FormContext)

interface ProjectFormWrapperProps {
    children: JSX.Element | JSX.Element[]
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

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        const formData = new FormData(formRef.current!);

        const project = {
            name: formData.get('name'),
            description: formData.get('description'),
            timeTotal: formData.get('timeTotal'),
            client: formData.get('client'),
            headerPicture: formData.get('headerPicture'),
            stack,
            complexity,
            links,
            time,
            features,
            photos,
        }

        console.log(project)
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
