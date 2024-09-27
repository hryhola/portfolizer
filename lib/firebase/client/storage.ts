import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firebaseApp } from "./index";

const storage = getStorage(firebaseApp);

type UploadResult = { success: true, downloadURL: string } | { success: false, error?: string }

// Function to upload user's profile picture
export async function uploadProfilePicture(userUid: string, file: File): Promise<UploadResult> {
    try {
        // Reference to the user's profile picture folder in storage
        const storageRef = ref(storage, `users/${userUid}/profile-pictures/${file.name}`);

        // Start the upload task
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Optional: You can track upload progress here
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.error(error)

                    resolve({ success: false, error: error.message });
                },
                () => {
                    // On successful upload, get the file's download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve({ success: true, downloadURL }); // Return the download URL
                    });
                }
            );
        });
    } catch (error) {
        console.error("Error uploading profile picture:", error);

        return Promise.resolve({ success: false, error: 'Something went wrong' })
    }
}

export async function uploadProjectPicture(projectUid: string, file: File): Promise<UploadResult> {
    try {
        const storageRef = ref(storage, `projects/${projectUid}/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload ' + file.name + ' ' + progress + '% done');
                },
                (error) => {
                    console.error(error)

                    resolve({ success: false, error: error.message });
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve({ success: true, downloadURL });
                    });
                }
            );
        });
    } catch (error) {
        console.error("Error uploading project header:", error);

        return Promise.resolve({ success: false, error: 'Something went wrong' })
    }
}
