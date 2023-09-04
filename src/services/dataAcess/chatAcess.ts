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

  for (let i in users) {
    let userRef = doc(usersReferences, users[i]);
    updateChatUserAcess(userRef, chatId, body, now);
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
