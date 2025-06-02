import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "capacitor-newsfeed.firebaseapp.com",
  projectId: "capacitor-newsfeed",
  storageBucket: "capacitor-newsfeed.firebasestorage.app",
  messagingSenderId: "581630022985",
  appId: "1:581630022985:web:59c062c897c98dae7b7698",
  measurementId: "G-J9P7MGBJ73",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { app, analytics, firestore };
