'use client'

import React, { FormEventHandler, createContext, useContext, useRef, useState } from 'react'
import { StackData } from './stackBlock'
import { ComplexityLevelData } from './complexityLevelsBlock'
import { LinkData } from './linksBlock'
import { TimeData } from './timeSpentChart'
import { FeatureData } from './features'
import { PhotosData } from './projectPhotos'
import { ProjectData } from '@/lib/firebase/admin/db'
import { packRecords } from '@/lib/object'
import { useToast } from '@/hooks/use-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { updateProject } from '@/lib/firebase/client/db'
import { MAX_IMAGE_SIZE } from '@/lib/const'
import { cleanUpStorage, uploadProjectPicture } from '@/lib/firebase/client/storage'
import { cn } from '@/lib/utils'

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
    headerImageSrc?: string
}

export const ProjectFormWrapper: React.FC<ProjectFormWrapperProps> = (props) => {
    const [stack, setStack] = useState([...props.stack].sort((a, b) => a.order - b.order))
    const [complexity, setComplexity] = useState([...props.complexity].sort((a, b) => a.order - b.order))
    const [links, setLinks] = useState([...props.links.sort((a,b) => a.order - b.order)])
    const [time, setTime] = useState(props.time)
    const [features, setFeatures] = useState(props.features)
    const [photos, setPhotos] = useState(props.photos)
    const [isLoading, setIsLoading] = useState(false)

    const formRef = useRef<HTMLFormElement>(null)

    const toast = useToast()
    const router = useRouter()
    const searchParams = useSearchParams()

    const uploadPictures = async (formData: FormData) => {
        const files = photos
            .slice(0, 50)
            .filter(p => p.file && p.file.size) as Array<Required<PhotosData>>

        const localHeaderImageFile = formData.get('headerPicture') as File

        if (localHeaderImageFile && localHeaderImageFile.size) {
            files.push({ src: '', file: localHeaderImageFile })
        }

        if (files.some(f => f.file.size > MAX_IMAGE_SIZE)) {
            toast.toast({
                title: 'Image too big',
                description: 'Max file size is 5 mb'
            })

            return false
        }

        const uploadTasks = await Promise.all(files.map(async f => {
            const result = await uploadProjectPicture(props.uid, f.file)

            if (!result.success) {
                toast.toast({
                    variant: 'destructive',
                    title: 'Error while uploading ' + f.file.name,
                    description: result.error || 'Something went wrong'
                })
            }

            return {
                localFile: f.file,
                downloadUrl: result.success ? result.downloadURL : null
            }
        }))

        const photosResult = photos.slice(0, 50).map((photo) => {
            if (photo.file) {
                const uploadResult = uploadTasks.find(t => t.localFile === photo.file)

                if (uploadResult && uploadResult.downloadUrl) {
                    return {
                        src: uploadResult.downloadUrl
                    }
                }
            }

            return photo
        })

        const headerResult = uploadTasks.find(t => t.localFile === localHeaderImageFile)

        return [
            headerResult && headerResult.downloadUrl ? headerResult.downloadUrl : undefined,
            photosResult
        ] as const
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        const formData = new FormData(formRef.current!)

        const imageUploadResult = await uploadPictures(formData)

        if (!imageUploadResult) {
            return
        }

        const [newHeaderSrc, newPhotos] = imageUploadResult

        cleanUpStorage(
            'projects/' + props.uid,
            [newHeaderSrc ? newHeaderSrc : props.headerImageSrc, ...newPhotos.map(p => p.src)].filter(p => typeof p === 'string')
        ).catch(e => console.error(e))

        const name = formData.get('name')

        if (typeof name !== 'string') {
            setIsLoading(false)

            toast.toast({
                title: 'Cannot update the project without name',
                variant: 'destructive',
                description: 'Please enter the name of the project' 
            })

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
            published: formData.get('published') === 'on',
            headerImageSrc: newHeaderSrc,
            photos: newPhotos
        }


        const result = await updateProject(props.uid, project)

        setIsLoading(false)
    
        if (!result.success) {
            toast.toast({
                title: 'Cannot update the project',
                description: result.error || 'Something went wrong'
            })
        
            return
        }

        toast.toast({
            title: `Project ${props.id} updated`,
            description: 'Refreshing...'
        })
    
        const query = new URLSearchParams(searchParams.toString())
        query.delete('mode')
        const newUrl = `${window.location.pathname}?${query.toString()}`

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
        <form className={cn(isLoading ? 'opacity-50 pointer-events-none': '')}
            onSubmit={handleSubmit}
            ref={formRef}
        >{props.children}</form>
    </FormContext.Provider>
}
