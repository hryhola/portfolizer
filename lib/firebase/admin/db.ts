import "server-only";

import { getFirestore } from "firebase-admin/firestore";
import { adminApp } from "./index";
import { ComplexityLevelValue } from "@/components/features/project/complexityLevel";

export const adminDb = getFirestore(adminApp)

export type UserData = {
    uid: string
    id: string
    name: string
    bio?: string
    imageSrc?: string
    phoneNumber?: string
    email?: string
    twitterId?: string
    telegramId?: string
    linkedInId?: string
    githubId?: string
}

export const getUser = async (params: { id: string } | { uid: string }) => {
    let document: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null = null;

    if ('uid' in params) {
        document = await adminDb.collection('users').doc(params.uid).get()
    } else {
        const query = await adminDb.collection('users').where('id', '==', params.id).get()

        document = query.size === 0 ? null : query.docs[0];
    }


    if (!document || !document.exists) {
        return null
    }

    return {
        ...document.data() ,
        uid: document.id
    } as UserData
}

export type ComplexityRecord = { value: ComplexityLevelValue, explanation?: string, order: number }

export type ProjectData = {
    uid: string
    id: string
    name: string
    published: boolean
    authorUid: string
    client?: string
    date?: Date
    description?: string
    timeTotal?: number
    headerPictureSrc?: string
    stack?: Record<string, { value: string, order: number }>
    complexity?: Record<string, ComplexityRecord>
    links: Array<{ id: string, url: string, order: number }>
    time?: Record<string, { minutes: number, details?: string }>
    features?:  Array<{ id: string, text: string, order: number }>
    headerImageSrc?: string
    photos?: Array<{ src: string }>
}

export const getUserProjects = async (user: UserData, includeUnpublished = false) => {
    let q = adminDb.collection('projects')
        .where('authorUid', '==', user.uid)

    if (!includeUnpublished) {
        q = q.where('published', '==', true)
    }

    return (await q.get()).docs
        .map(d => ({
            ... d.data(),
            date: d.get('date')?.toDate()
        } as ProjectData))
        .sort((a,b) => (b.date?.getTime()|| 0) - (a.date?.getTime() || 0)) 
}

export const getProject = async (authorId: string, projectId: string) => {
    const user = await getUser({ id: authorId })

    if (!user) {
        return null;
    }

    let q = await adminDb.collection('projects')
        .where('authorUid', '==', user.uid)
        .where('id', '==', projectId)
        .get()

    if (q.empty) {
        return null
    }

    const projectData = {
        ...q.docs[0].data(),
        date: q.docs[0].get('date')?.toDate(),
        uid: q.docs[0].id
    } as ProjectData

    return {
        ...projectData,
        authorName: user.name,
        authorId: user.id,
        authorImageSrc: user.imageSrc
    }
}
