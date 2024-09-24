import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseApp } from "./index";
import type { UserData } from "../admin/db";
import { removeUndefined } from "@/lib/object";

export const db = getFirestore(firebaseApp);

export const updateUser = async (uid: string, data: UserData) => {
    const docRef = doc(db, 'users', uid);

    const documentExists = (await getDoc(docRef)).exists()

    if (!documentExists) {
        return {
            success: false,
            error: `User with UID ${uid} does not exist!`
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
