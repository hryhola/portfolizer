import { createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, linkWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

import type { APIResponse } from '@/types';
import { auth } from './index'
import { createUserIfNotExist } from './db';

export const signInWithProvider = async (providerId: 'google' | 'github') => {
    const provider = providerId === 'google'
        ? new GoogleAuthProvider()
        : new GithubAuthProvider();

    try {
        const userCredential = await signInWithPopup(auth, provider);

        const createResult = await createUserIfNotExist(userCredential.user.uid, {
            id: userCredential.user.uid,
            name: userCredential.user.displayName ?? userCredential.user.uid
        })

        if (!createResult.success) {
            return createResult;
        }

        const idToken = await userCredential.user.getIdToken();

        const response = await fetch('/api/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
        });

        if (!response.ok) {
            return { success: false, error: 'Something went wrong' };
        }

        const resBody = (await response.json()) as APIResponse<string>;

        if (!resBody.success) {
            return { success: false, error: resBody.error || 'Something went wrong' };
        }

        return { success: true }
    } catch (error) {
        console.error('Error signing in with ' + providerId, error)

        if (error instanceof Error && error.message.includes('auth/account-exists-with-different-credential')) {
            return {
                success: false,
                error: 'The account with this email is already registered with different OAuth provider. You should log in with preexisting provider and then link a new one.'
            }
        }

        return { success: false, error: 'Something went wrong' }
    }
}

export const linkProvider  = async (providerId: 'google' | 'github') => {
    const provider = providerId === 'google'
        ? new GoogleAuthProvider()
        : new GithubAuthProvider();

    try {
        const userCredential = await linkWithPopup(auth.currentUser!, provider);

        const idToken = await userCredential.user.getIdToken();

        const response = await fetch('/api/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
        });

        if (!response.ok) {
            return { success: false, error: 'Something went wrong' };
        }

        const resBody = (await response.json()) as APIResponse<string>;

        if (!resBody.success) {
            return { success: false, error: resBody.error || 'Something went wrong' };
        }

        return { success: true }
    } catch (error) {
        console.error('Error when linking ' + providerId, error);

        if (error instanceof Error && error.message.includes('auth/credential-already-in-use')) {
            return { success: false, error: 'This profile is already linked to a different account.' };
        }

        return { success: false, error: 'Something went wrong' };
    }
}

export const registerWithEmail = async (id: string, email: string, name: string, password: string, ) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const createResult = await createUserIfNotExist(userCredential.user.uid, {
            id: id,
            name: name
        })

        if (!createResult.success) {
            return createResult;
        }

        const idToken = await userCredential.user.getIdToken();

        const response = await fetch('/api/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
        });

        if (!response.ok) {
            return { success: false, error: 'Something went wrong' };
        }

        const resBody = (await response.json()) as APIResponse<string>;

        if (!resBody.success) {
            return { success: false, error: resBody.error || 'Something went wrong' };
        }

        return { success: true }
    } catch (error) {
        console.error('Error registering with email and password', error)

        if (error instanceof Error && error.message.includes('auth/email-already-in-use')) {
            return { success: false, error: 'This email is already in use' }
        }

        return { success: false, error: error instanceof Error ? error.message : 'Something went wrong' }
    }
}

export const signInWithEmail = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        const idToken = await userCredential.user.getIdToken();

        const response = await fetch('/api/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
        });

        if (!response.ok) {
            return { success: false, error: 'Something went wrong' };
        }

        const resBody = (await response.json()) as APIResponse<string>;

        if (!resBody.success) {
            return { success: false, error: resBody.error || 'Something went wrong' };
        }

        return { success: true }
    } catch (error) {
        console.error('Error login in with email and password', error)

        if (error instanceof Error && error.message.includes('auth/invalid-credential')) {
            return { success: false, error: 'Invalid email or password' }
        }

        return { success: false, error: error instanceof Error ? error.message : 'Something went wrong' }
    }
}

export async function signOut() {
    try {
        await auth.signOut();

        const response = await fetch('/api/auth/sign-out', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return { success: false, error: 'Something went wrong' };
        }

        const resBody = (await response.json()) as unknown as APIResponse<string>;
    
        if (!resBody.success) {
            return { success: false, error: resBody.error || 'Something went wrong' };
        }

        return { success: true }
    } catch (error) {
        console.error('Error signing out with Google', error);
    
        return { success: false, error: 'Something went wrong' }
    }
}
