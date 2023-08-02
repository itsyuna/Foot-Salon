import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_JOIN_API_KEY}`,
  authDomain: `${process.env.REACT_APP_JOIN_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_JOIN_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_JOIN_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_JOIN_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_JOIN_APP_ID}`,
  measurementId: `${process.env.REACT_APP_JOIN_MEASUREMENT_ID}`,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const dbService = getFirestore();
export const storageService = getStorage(app);
