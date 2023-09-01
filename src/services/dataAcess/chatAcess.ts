import { arrayUnion, collection, getDoc, updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebaseconfig";
import { Chat, chatUsers } from "@/types/allTypes";

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

  await updateDoc(chatRef, {
    messages: arrayUnion({
      type: "text",
      author: userId,
      body,
      date: now,
    }),
  });

  for (let user of users.users) {
    const userRef = doc(usersReferences, user);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();

      const updatedChats = data.chats.map((chat: Chat) => {
        if (chat.chatId === chatId) {
          return {
            ...chat,
            lastMessage: body,
            lastMessageDate: now,
          };
        }
        return chat;
      });

      await updateDoc(userRef, { chats: updatedChats });
    }
  }
};
