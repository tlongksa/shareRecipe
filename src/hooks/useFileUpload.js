/** @format */
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { firebaseStorage } from '../firebase';

const fileUploadHandler = async (file, setLoading, setError, callback, type = 'images/') => {
    setLoading(true);
    const storageRef = ref(firebaseStorage, type + file.name);
    const contentType = type === 'images/' ? 'image/jpeg, image/png, image/jpg' : 'video/mp4';
    const uploadTask = uploadBytesResumable(storageRef, file, {
        contentType: contentType,
    });
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
        'state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default:
                    break;
            }
        },
        (error) => {
            setLoading(false);
            setError(error.message);
            return '';
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setLoading(false);
                callback(downloadURL);
            });
        },
    );
};

const deleteFileHandler = async (file, type = 'images/') => {
    const storageRef = ref(firebaseStorage, type + file.name);
    deleteObject(storageRef)
        .then(() => {
            console.log('Delete file from storage successfully');
        })
        .catch((err) => console.log(err));
};

export { fileUploadHandler, deleteFileHandler };
