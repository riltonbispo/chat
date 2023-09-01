import { db } from "@/firebaseconfig";
import { Chat, User } from "@/types/allTypes";

import {
  DocumentData,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  DocumentReference,
} from "firebase/firestore";

const usersReferences = collection(db, "users");
const chatsReferences = collection(db, "chats");

export const addUserAcess = async (email: string, name: string) => {
  const response = await addDoc(usersReferences, { email, name, chats: [] });
  return response;
};

export const currentUserAcess = async (email: string) => {
  const q = query(usersReferences, where("email", "==", email));
  const querySnashot = await getDocs(q);

  if (querySnashot.empty) {
    return null;
  } else {
    const userData: DocumentData = querySnashot.docs[0].data();
    const currentUser: User = {
      id: querySnashot.docs[0].id,
      email: userData.email,
      name: userData.name,
      chats: userData.chats,
    };
    return currentUser;
  }
};

export const contactListAcess = async () => {
  let response = await getDocs(usersReferences);
  return response;
};

export const createChatAcess = async (u1: User, u2: User) => {
  const user1 = doc(usersReferences, u1.id);
  const user2 = doc(usersReferences, u2.id);
  const userSnap1 = await getDoc(user1);
  const userSnap2 = await getDoc(user2);

  if (userSnap1.exists() && userSnap2.exists()) {
    let userData1: DocumentData = userSnap1.data();
    let userData2: DocumentData = userSnap2.data();

    let hasChat = userData1.chats.some(
      (chat: Chat) =>
        chat.with === user2.id ||
        userData2.chats.some((c: Chat) => c.with === user1.id)
    );

    if (!hasChat) {
      addNewChatUser(u1, u2, user1, user2);
    }
  }
};

const addNewChatUser = async (
  u1: User,
  u2: User,
  u1Ref: DocumentReference,
  u2Ref: DocumentReference
) => {
  const response = await addDoc(chatsReferences, {
    messages: [],
    users: [u1.id, u2.id],
  });

  const newChatData = {
    chatId: response.id,
    lastMessage: "",
    lastMessageDate: null,
  };

  await updateChatsUser(u1Ref, {
    ...newChatData,
    title: u2.name,
    with: u2.id,
  });

  await updateChatsUser(u2Ref, {
    ...newChatData,
    title: u1.name,
    with: u1.id,
  });

  return response;
};

const updateChatsUser = async (user: DocumentReference, user2: Chat) => {
  return await updateDoc(user, {
    chats: arrayUnion(user2),
  });
};

export const updateChatUserAcess = async (
  userRef: DocumentReference,
  chatId: string,
  body: string,
  now: Date
) => {
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();

    if (userData.chats) {
      const updatedChats = userData.chats.map((chat: Chat) => {
        if (chat.chatId === chatId) {
          chat.lastMessage = body;
          chat.lastMessageDate = now;
        }
        return chat;
      });
      await updateDoc(userRef, {
        chats: updatedChats,
      });
    }
  }
};
