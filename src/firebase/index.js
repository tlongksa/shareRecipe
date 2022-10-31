// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: 'hotel-booking-platform.firebaseapp.com',
    projectId: 'hotel-booking-platform',
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: '805642290387',
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: 'G-RDNREN99K1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firebaseStorage = getStorage(app);

export { firebaseStorage };
