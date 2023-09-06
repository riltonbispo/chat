import { db } from "@/services/firebaseconfig";
import { Chat, MessageType, chatUsers } from "@/types/allTypes";
import { DocumentData, collection, doc, onSnapshot } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

const usersReferences = collection(db, "users");
const chatsReferences = collection(db, "chats");

export const chatListOberser = (
  userId: string,
  setChatList: Dispatch<SetStateAction<Chat[]>>
) => {
  onSnapshot(doc(usersReferences, userId), (doc) => {
    let data = doc.data();
    if (data?.chats) {
      const sortedChats = data.chats.sort(
        (a: Chat, b: Chat) => b.lastMessageDate - a.lastMessageDate
      );
      setChatList(sortedChats);
    }
  });
};

export const chatContentObserver = (
  chatId: string,
  setList: Dispatch<SetStateAction<MessageType[]>>,
  setUsers: Dispatch<SetStateAction<chatUsers>>
) => {
  onSnapshot(doc(chatsReferences, chatId), (doc) => {
    if (doc.exists()) {
      let data: DocumentData = doc.data();
      setList(data.messages);
      setUsers(data.users);
    }
  });
};
