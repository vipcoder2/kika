
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config - replace with your config Here
// You can find your Firebase config in your Firebase console under Project Settings
// Make sure to replace the placeholders with your actual Firebase project details
// If you don't have a Firebase project, create one at https://console.firebase.google.com/
const firebaseConfig = {

  apiKey: "AIzaSyDabpeLX5d9UxffjC8bRcU4AUL72RF_9nw",

  authDomain: "kikasports-934de.firebaseapp.com",

  projectId: "kikasports-934de",

  storageBucket: "kikasports-934de.firebasestorage.app",

  messagingSenderId: "550533196930",

  appId: "1:550533196930:web:1a861581686fca4eb4189b"

};



// Initialize Firebase only if no apps exist
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
