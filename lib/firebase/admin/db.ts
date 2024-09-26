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
    projectIds?: string[]
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
    client: string
    name: string
    date?: Date
    description?: string
    timeTotal?: number
    headerPictureSrc?: string
    stack?: Record<string, { value: string, order: number }>
    complexity?: Record<string, ComplexityRecord>
    links: Array<{ label: string, url: string, order: number }>
    time?: Record<string, { minutes: number, details?: string }>
    features?:  Array<{ text: string, order: number }>
    photos?: Array<string>
}

export const getUserProjects = async (user: UserData) => {
    const q = await adminDb.collection('projects').where('authorUid', '==', user.uid).orderBy('date', 'asc').get()

    return q.docs.map(d => ({
        ... d.data(),
        date: d.get('date').toDate()
    })) as ProjectData[]
}
