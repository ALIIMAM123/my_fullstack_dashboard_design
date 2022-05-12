import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "fir-dashboard-a0eae.firebaseapp.com",
  projectId: "fir-dashboard-a0eae",
  storageBucket: "fir-dashboard-a0eae.appspot.com",
  messagingSenderId: "1075760836667",
  appId: "1:1075760836667:web:bc3cb1b3df4131d00d6c1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app);
export const storage = getStorage(app);

