// For Firebase v9+
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";


// Firebase Config
// const firebaseConfig = {
//     apiKey:import.meta.env.FIREBASE_API_KEY,
//     authDomain:import.meta.env.FIREBASE_AUTH_DOMAIN,
//     databaseURL:import.meta.env.DATABASEURL,
//     projectId:import.meta.env.FIREBASE_PROJECT_ID,
//     storageBucket:import.meta.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId:import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId:import.meta.env.FIREBASE_APP_ID,
//     measurementId:import.meta.env.MEASUREMENTID
// };

// Debugging: Log environment variables
console.log("API Key from Environment:", import.meta.env?.VITE_FIREBASE_API_KEY);

const firebaseConfig = {
    apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || "MISSING_API_KEY",
    authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || "MISSING_AUTH_DOMAIN",
    databaseURL: import.meta.env?.VITE_FIREBASE_DATABASE_URL || "MISSING_DATABASE_URL",
    projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || "MISSING_PROJECT_ID",
    storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || "MISSING_STORAGE_BUCKET",
    messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "MISSING_MESSAGING_SENDER_ID",
    appId: import.meta.env?.VITE_FIREBASE_APP_ID || "MISSING_APP_ID",
    measurementId: import.meta.env?.VITE_FIREBASE_MEASUREMENT_ID || "MISSING_MEASUREMENT_ID"
};

// Check if API key is missing
if (firebaseConfig.apiKey === "MISSING_API_KEY") {
    console.error("🚨 Firebase API Key is missing! Make sure Netlify environment variables are set.");
} else {
    console.log("✅ Firebase API Key Loaded Successfully!");
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

