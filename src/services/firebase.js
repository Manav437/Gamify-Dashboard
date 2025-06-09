// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCGjuDYj21thvqSK5rCha3sOC1FP9DyT5E",
    authDomain: "gamify-dashboard-cac68.firebaseapp.com",
    projectId: "gamify-dashboard-cac68",
    storageBucket: "gamify-dashboard-cac68.firebasestorage.app",
    messagingSenderId: "471733951830",
    appId: "1:471733951830:web:8e4970aaba771ea9ddcaf7",
    measurementId: "G-WG048YXG60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);