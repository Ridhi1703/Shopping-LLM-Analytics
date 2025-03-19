// For Firebase v9+
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Config
const firebaseConfig = {
    apiKey:import.meta.env.FIREBASE_API_KEY,
    authDomain:import.meta.env.FIREBASE_AUTH_DOMAIN,
    databaseURL:import.meta.env.DATABASEURL,
    projectId:import.meta.env.FIREBASE_PROJECT_ID,
    storageBucket:import.meta.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId:import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
    appId:import.meta.env.FIREBASE_APP_ID,
    measurementId:import.meta.env.MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };