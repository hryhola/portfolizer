import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { firebaseApp } from "./index";

const storage = getStorage(firebaseApp);

type UploadResult = { success: true, downloadURL: string } | { success: false, error?: string }

// Function to upload user's profile picture
export async function uploadProfilePicture(userUid: string, file: File): Promise<UploadResult> {
    try {
        // Reference to the user's profile picture folder in storage
        const storageRef = ref(storage, `users/${userUid}/${file.name}`);

        // Start the upload task
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve) => {
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

// Helper function to extract file name from download URL
function extractFileNameFromURL(url: string): string {
    const decodedUrl = decodeURIComponent(url);  // Decode URL to handle special characters
    const fileName = decodedUrl.substring(decodedUrl.lastIndexOf('/') + 1, decodedUrl.indexOf('?'));
    return fileName;
}

export async function cleanUpStorage(folderPath: string, uploadedURLs: string[]) {
    const storage = getStorage();
    const folderRef = ref(storage, folderPath);

    try {
         // List all items in the folder
         const folderContents = await listAll(folderRef);
    
        // List all items in the folder
        const uploadedFileNames = uploadedURLs.map(url => extractFileNameFromURL(url));

        // Filter out files not present in the uploaded URLs
        const filesToDelete = folderContents.items.filter(item => {
            const fileName = item.name; // The file name in storage
            return !uploadedFileNames.includes(fileName); // Check if it's not in the uploaded list
        });

        // Delete each file that is not in the uploaded list
        for (const fileRef of filesToDelete) {
            await deleteObject(fileRef);
            console.log(`Deleted file: ${fileRef.name}`);
        }

        if (filesToDelete.length === 0) {
            console.log("No files to delete. All files are up to date.");
        }
    } catch (error) {
        console.error("Error cleaning up storage:", error);
    }
}
