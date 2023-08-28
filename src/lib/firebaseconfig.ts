'use client'
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDocs, getFirestore } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";

import { UserType } from "@/types/ChatTypes";

const firebaseConfig = {
  apiKey: "AIzaSyD4Z6ubIrS-Rd2hXDaD4Wl6KK02_kGWHI8",
  authDomain: "chat-3cc67.firebaseapp.com",
  projectId: "chat-3cc67",
  storageBucket: "chat-3cc67.appspot.com",
  messagingSenderId: "381169874978",
  appId: "1:381169874978:web:4bb3c8ea77b9702356f27b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

const useCollections = collection(db, 'users')

export const addUser = (email: string, name: string) => {
  addDoc(useCollections, { name, email })
}

export const currentUser = async (email: string) => {
  try {
    const result = await getDocs(useCollections);
    const foundUser = result.docs.find(doc => doc.data().email === email);
    
    if (foundUser) {
      const data = foundUser.data();
      console.log(`id: ${foundUser.id} username: ${data.name} email: ${data.email}`)
      return {
        id: foundUser.id,
        username: data.name,
        email: data.email
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
};

export const contactList = async (userId: string) =>{
  let list: UserType[] = []
  let result = await getDocs(useCollections)
  result.forEach(result => {
    let data = result.data()

    if(result.id != userId){
      list.push({
        id: result.id,
        username: data.name,
        email: data.email
      })
    }
  })
  
  return list
}