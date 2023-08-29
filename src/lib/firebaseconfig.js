"use client";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getDocs,
  getDoc,
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

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

export const addUser = (email, name) => {
  addDoc(usersCollections, { name, email });
};

export const currentUser = async (email) => {
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

export const contactList = async (userId) => {
  let list = [];
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

export const createChat = async (u1, u2) => {
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

export const onChatList = (userId, setChatList) => {
  return onSnapshot(doc(db, "users", userId), (doc) => {
    let data = doc.data();
    if (data?.chats) {
      const sortedChats = data.chats.sort((a, b) => b.lastMessageDate - a.lastMessageDate);
      setChatList(sortedChats);
    }
  });
};

export const onChatContent = (chatId, setList, setUsers) => {
  return onSnapshot(doc(db, "chats", chatId), (doc) => {
    if (doc) {
      let data = doc.data();
      setList(data.messages);
      setUsers(data.users);
    }
  });
};

export const sendMessage = async (chatData, userId, type, body, users) => {
  const chatRef = doc(db, "chats", chatData.chatId);

  let now = new Date();

  updateDoc(chatRef, {
    messages: arrayUnion({
      type,
      author: userId,
      body,
      date: now,
    }),
  });

  for (let i in users) {
    let userRef = doc(db, "users", users[i]);
    let userSnap = await getDoc(userRef); // Você precisa buscar os dados do documento

    if (userSnap.exists()) {
      let uData = userSnap.data();
      if (uData.chats) {
        let chats = [...uData.chats];

        for (let e in chats) {
          if (chats[e].chatId == chatData.chatId) {
            chats[e].lastMessage = body;
            chats[e].lastMessageDate = now;
          }
        }

        const newUserRef = doc(db, "users", users[i]);

        await updateDoc(newUserRef, {
          chats,
        });
      }
    }
  }
};
