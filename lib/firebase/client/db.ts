import { collection, doc, getDoc, getDocs, getFirestore, query, runTransaction, setDoc, where } from "firebase/firestore";
import { firebaseApp } from "./index";
import { removeUndefined } from "@/lib/object";
import type { ProjectData, UserData } from "../admin/db";
import { v4 } from "uuid";

export const db = getFirestore(firebaseApp);

export const updateUser = async (uid: string, data: Partial<UserData>, options?: { existCheck?: 'errorIfNot' | 'errorIfDo' }) => {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef)
    const documentExists = userDoc.exists()

    if (options && options.existCheck) {
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

    const now = new Date()

    const createdAt = documentExists ? undefined : now

    try {
        await setDoc(userRef,{
            ...removeUndefined({ ...data, createdAt }),
            updatedAt: now
        }, { merge: true })

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

export const createUserIfNotExist = async (uid: string, data: Omit<UserData, 'uid' | 'createdAt' | 'updatedAt'>) => {
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
        await runTransaction(db, async (transaction) => {
            const userRef = doc(db, 'users', userUid);
            const userDoc = await transaction.get(userRef)
            const userProjects = userDoc.get('projects') as string [] | null
    
            const projectV4Id = v4()
    
            const documentId = `${userUid}__${projectV4Id}`;

            const now = new Date()
    
            const projectDoc = {
                id: projectId,
                name: projectId,
                published: false,
                authorUid: userUid,
                createdAt: now,
                updatedAt: now
            };
        
            transaction.set(doc(db, "projects", documentId), projectDoc)
            transaction.set(userRef, { projects: userProjects
                ? [...userProjects, projectV4Id]
                : [projectV4Id]
             }, { merge: true })
        })

        return { success: true }
    } catch (error) {
        console.error(error)

        return { success: false, error: error instanceof Error ? error.message : 'Something went wrong' }
    }
}

export const deleteProject = async (projectUid: string) => {
    try {
        await runTransaction(db, async (transaction) => {
            const [userUid, projectV4Id] = projectUid.split('__')

            const projectRef = doc(db, 'projects', projectUid);
            const userRef = doc(db, 'users', userUid);
            const userDoc = await transaction.get(userRef);
        
            const userProjects = userDoc.get('projects') as string[] | null
            const userPublishedProjects: number = userDoc.get('publishedProjectsCount') || 0
            const isPublishedProject = (await transaction.get(projectRef)).get('published')

            transaction.delete(projectRef)
            transaction.set(userRef, {
                projects: userProjects
                    ? userProjects.filter(p => p !== projectV4Id)
                    : [],
                publishedProjectsCount: isPublishedProject
                    ? userPublishedProjects - 1
                    : userPublishedProjects
             }, { merge: true })
        })
        
        return { success: true }
    } catch (error) {
        console.error(error)

        return { success: false, error: error instanceof Error ? error.message : null }
    }
}

export const updateProject = async (uid: string, data: Partial<ProjectData>) => {
    try {
        await runTransaction(db, async (transaction) => {
            const projectRef = doc(db, 'projects', uid);
            const projectDoc = await transaction.get(projectRef)
            const prevPublished = projectDoc.get('published')

            if (typeof data.published === 'boolean' && data.published !== prevPublished) {
                const [userUid] = uid.split('__')
                const userRef = doc(db, 'users', userUid);
                const userDoc = await transaction.get(userRef);
                const userPublishedProjects: number = userDoc.get('publishedProjectsCount') || 0

                transaction.set(userRef, {
                    publishedProjectsCount: data.published
                        ? userPublishedProjects + 1
                        : userPublishedProjects - 1
                }, { merge: true })
            }

            transaction.set(projectRef, {
                ...removeUndefined(data),
                updatedAt: new Date()
            }, { merge: true })
        })

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
