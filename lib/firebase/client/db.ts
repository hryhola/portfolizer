import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { firebaseApp } from "./index";
import { removeUndefined } from "@/lib/object";
import type { ProjectData, UserData } from "../admin/db";
import { v4 } from "uuid";

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

export const isProjectIdAvailable = async (userUid: string, projectId: string) => {
    const projects = collection(db, 'projects')

    const docs = await getDocs(query(
        projects,
        where('id', '==', projectId),
        where('authorUid', '==', userUid)
    ))

    return docs.empty;
}

export const createProject = async (userUid: string, projectId: string) => {
    try {
        const documentId = `${userUid}__${v4()}`;

        const projectDoc = {
            id: projectId,
            name: projectId,
            published: false,
            authorUid: userUid,
        };

        await setDoc(doc(db, "projects", documentId), projectDoc);

        return { success: true }
    } catch (error) {
        console.error(error)

        return { success: false, error: error instanceof Error ? error.message : 'Something went wrong' }
    }
}

export const deleteProject = async (projectUid: string) => {
    try {
        const docRef = doc(db, 'projects', projectUid);
        
        await deleteDoc(docRef)
        
        return { success: true }
    } catch (error) {
        console.error(error)

        return { success: false, error: error instanceof Error ? error.message : null }
    }
}

export const updateProject = async (uid: string, data: Partial<ProjectData>) => {
    const docRef = doc(db, 'projects', uid);

    try {
        await setDoc(docRef, removeUndefined(data), { merge: true })

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
