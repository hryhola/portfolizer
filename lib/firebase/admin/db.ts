import "server-only";

import { getFirestore } from "firebase-admin/firestore";
import { adminApp } from "./index";

export const adminDb = getFirestore(adminApp)

export type UserData = {
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

    return document.data() as UserData
}
