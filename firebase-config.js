import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Debugging: Log environment variables
console.log("🔥 API Key from Environment:", window.env?.VITE_FIREBASE_API_KEY);

// Firebase Configuration
const firebaseConfig = {
    apiKey: window.env?.VITE_FIREBASE_API_KEY || "MISSING_API_KEY",
    authDomain: window.env?.VITE_FIREBASE_AUTH_DOMAIN || "MISSING_AUTH_DOMAIN",
    databaseURL: window.env?.VITE_FIREBASE_DATABASE_URL || "MISSING_DATABASE_URL",
    projectId: window.env?.VITE_FIREBASE_PROJECT_ID || "MISSING_PROJECT_ID",
    storageBucket: window.env?.VITE_FIREBASE_STORAGE_BUCKET || "MISSING_STORAGE_BUCKET",
    messagingSenderId: window.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "MISSING_MESSAGING_SENDER_ID",
    appId: window.env?.VITE_FIREBASE_APP_ID || "MISSING_APP_ID",
    measurementId: window.env?.VITE_FIREBASE_MEASUREMENT_ID || "MISSING_MEASUREMENT_ID"
};

// Initialize Firebase (This must happen BEFORE exporting auth and db)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase instances after initialization
export { app, auth, db };
