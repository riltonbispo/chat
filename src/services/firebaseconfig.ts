import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD4Z6ubIrS-Rd2hXDaD4Wl6KK02_kGWHI8",
  authDomain: "chat-3cc67.firebaseapp.com",
  projectId: "chat-3cc67",
  storageBucket: "chat-3cc67.appspot.com",
  messagingSenderId: "381169874978",
  appId: "1:381169874978:web:4bb3c8ea77b9702356f27b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
