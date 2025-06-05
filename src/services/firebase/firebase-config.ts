import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "capacitor-newsfeed-4f833.firebaseapp.com",
  projectId: "capacitor-newsfeed-4f833",
  storageBucket: "capacitor-newsfeed-4f833.firebasestorage.app",
  messagingSenderId: "626967728218",
  appId: "1:626967728218:web:721ec8e7ce2f083c7e8863",
  measurementId: "G-6D4C1LT499",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, firestore, storage };
