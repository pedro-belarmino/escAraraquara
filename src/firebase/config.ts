// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// import { getAnalytics } from "firebase/analytics";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_5zrpubSkP4iqamV6K5Wjd0DSD5aX14c",
    authDomain: "escoteiro-araraquara.firebaseapp.com",
    projectId: "escoteiro-araraquara",
    storageBucket: "escoteiro-araraquara.firebasestorage.app",
    messagingSenderId: "610981117616",
    appId: "1:610981117616:web:e2b48c887f3ff317780575",
    measurementId: "G-1TN0VQWMGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// const analytics = getAnalytics(app);



export const auth = getAuth(app);
export const db = getFirestore(app);