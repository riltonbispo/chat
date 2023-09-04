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

  for (const userIdToUpdate of users) {
    const userRef = doc(usersReferences, userIdToUpdate);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      if (userData?.chats) {
        const updatedChats = userData.chats.map((chat: Chat) => {
          if (chat.chatId === chatId) {
            return {
              ...chat,
              lastMessage: body,
              lastMessageDate: now,
            };
          }
          return chat;
        });

        await updateDoc(userRef, {
          chats: updatedChats,
        });
      }
    }
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
