import { arrayUnion, collection, getDoc, updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebaseconfig";
import { Chat, chatUsers } from "@/types/allTypes";
import { updateChatUserAcess } from "./userAcess";

const chatsReferences = collection(db, "chats");
const usersReferences = collection(db, "users");

export const sendMessageChatAcess = async (
  chatId: string,
  userId: string,
  body: string,
  users: chatUsers
) => {
  const chatRef = doc(chatsReferences, chatId);
  let now = new Date();

  const userRef = doc(usersReferences, users[0]);
  const userRef2 = doc(usersReferences, users[1]);
  const userSnap = await getDoc(userRef);
  const userSnap2 = await getDoc(userRef2);

  if (userSnap.exists()) {
    updateChatUserAcess(userRef, chatId, body, now);
  }
  if (userSnap2.exists()) {
    updateChatUserAcess(userRef2, chatId, body, now);
  }

  await updateDoc(chatRef, {
    messages: arrayUnion({
      type: "text",
      author: userId,
      body,
      date: now,
    }),
  });
};
