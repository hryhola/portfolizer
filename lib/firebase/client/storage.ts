import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firebaseApp } from "./index";

const storage = getStorage(firebaseApp);

// Function to upload user's profile picture
export async function uploadProfilePicture(userUid: string, file: File): Promise<{ success: true, downloadURL: string } | { success: false, error?: string }> {
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
