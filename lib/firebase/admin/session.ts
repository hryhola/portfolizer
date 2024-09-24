import "server-only";

import { SessionCookieOptions } from "firebase-admin/auth";
import { cookies } from "next/headers";

import { auth } from './auth'
import { adminDb } from "./db";

export const isUserAuthenticated = async (session?: string) => {
    const _session = session ?? getSession();

    if (!_session) return false;

    try {
        const isRevoked = !(await auth.verifySessionCookie(_session, true));
    
        return !isRevoked;
    } catch (error) {
        console.log(error);

        return false;
    }
}

export const getCurrentUser = async () => {
    const session = getSession();

    if (!(await isUserAuthenticated(session))) {
        return null;
    }

    const decodedIdToken = await auth.verifySessionCookie(session!);
    const userRecord = await auth.getUser(decodedIdToken.uid);
    const userDocumentRef = adminDb.collection('users').doc(userRecord.uid)
    const userDocument = await userDocumentRef.get()

    if (!userDocument.exists) {
        console.log(`User with UID ${userRecord.uid} has no corresponding user object! Creating.`)

        userDocumentRef.create({
            id: userRecord.uid,
            name: userRecord.uid
        })

        return {
            uid: userRecord.uid,
            email: userRecord.email,
            id: userRecord.uid,
            name:userRecord.uid,
        }
    }

    return {
        uid: userRecord.uid,
        email: userRecord.email,
        id: userDocument.get('id') as string,
        name: userDocument.get('name') as string,
    }
}

const getSession = () => cookies().get("__session")?.value

export const createSessionCookie = async (
    idToken: string,
    sessionCookieOptions: SessionCookieOptions
) => {
    return auth.createSessionCookie(idToken, sessionCookieOptions);
}

export const revokeAllSessions = async (session: string) => {
    const decodedIdToken = await auth.verifySessionCookie(session);

    return auth.revokeRefreshTokens(decodedIdToken.sub);
}

