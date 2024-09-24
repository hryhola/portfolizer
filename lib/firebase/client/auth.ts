import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import type { APIResponse } from "@/types";
import { auth } from './index'

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
        const userCredential = await signInWithPopup(auth, provider);
        const idToken = await userCredential.user.getIdToken();

        const response = await fetch("/api/auth/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
        console.error("Error signing in with Google", error)

        return { success: false, error: 'Something went wrong' }
    }
}

export async function signOut() {
    try {
        await auth.signOut();

        const response = await fetch("/api/auth/sign-out", {
            headers: {
                "Content-Type": "application/json",
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
        console.error("Error signing out with Google", error);
    
        return { success: false, error: 'Something went wrong' }
    }
}
