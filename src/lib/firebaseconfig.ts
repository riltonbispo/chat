"use client";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getDocs,
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

import { ChatType, UserType } from "@/types/ChatTypes";

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

const usersCollections = collection(db, "users");
const chatsCollections = collection(db, "chats");

export const addUser = (email: string, name: string) => {
  addDoc(usersCollections, { name, email });
};

export const currentUser = async (email: string) => {
  try {
    const result = await getDocs(usersCollections);
    const foundUser = result.docs.find((doc) => doc.data().email === email);

    if (foundUser) {
      const data = foundUser.data();
      console.log(
        `id: ${foundUser.id} username: ${data.name} email: ${data.email}`
      );
      return {
        id: foundUser.id,
        username: data.name,
        email: data.email,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
};

export const contactList = async (userId: string) => {
  let list: UserType[] = [];
  let results = await getDocs(usersCollections);
  results.forEach((result) => {
    let data = result.data();

    if (result.id != userId) {
      list.push({
        id: result.id,
        username: data.name,
        email: data.email,
      });
    }
  });

  return list;
};

export const createChat = async (u1: UserType, u2: UserType) => {
  let newChat = await addDoc(chatsCollections, {
    messages: [],
    users: [u1.id, u2.id],
  });

  const user = doc(db, "users", u1.id);
  const user2 = doc(db, "users", u2.id);

  await updateDoc(user, {
    chats: arrayUnion({
      chatId: newChat.id,
      title: u2.username,
      with: u2.id,
    }),
  });

  await updateDoc(user2, {
    chats: arrayUnion({
      chatId: newChat.id,
      title: u1.username,
      with: u1.id,
    }),
  });
};

export const onChatList = (userId: string, setChatList: any) => {
  return onSnapshot(doc(db, "users", userId), (doc) => {
    let data = doc.data();
    if (data?.chats) {
      setChatList(data?.chats);
    }
  });
};

export const onChatContent = (chatId: string, setList: any) => {
  return onSnapshot(doc(db, 'chats', chatId), (doc) => {
    if (doc) {
      let data: any = doc.data()
      setList(data.messages)
    }
  })
}