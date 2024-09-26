import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { firebaseApp } from "./index";
import { removeUndefined } from "@/lib/object";
import type { UserData } from "../admin/db";

export const db = getFirestore(firebaseApp);

export const updateUser = async (uid: string, data: Partial<UserData>, options?: { existCheck?: 'errorIfNot' | 'errorIfDo' }) => {
    const docRef = doc(db, 'users', uid);

    if (options && options.existCheck) {
        const documentExists = (await getDoc(docRef)).exists()
    
        if (documentExists && options.existCheck === 'errorIfDo') {
            return {
                success: false,
                error: `User with UID ${uid} already exists!`
            }
        }

        if (!documentExists && options.existCheck === 'errorIfNot') {
            return {
                success: false,
                error: `User with UID ${uid} does not exists!`
            }

        }
    }

    try {
        await setDoc(docRef, removeUndefined(data))

        return {
            success: true
        }
    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: 'Something went wrong'
        }
    }
}

export const createUserIfNotExist = async (uid: string, data: Omit<UserData, 'uid'>) => {
    const result = await updateUser(uid, data, { existCheck: 'errorIfDo' })

    if (!result.success) {
        if (result.error?.includes('already exists')) {
            return { success: true } as const
        }

        return result
    }

    return { success: true } as const
}

export const isUserIdAvailable = async (id: string) => {
    const users = collection(db, 'users')
    const docs = await getDocs(query(users, where('id', '==', id)))

    return docs.empty;
}
