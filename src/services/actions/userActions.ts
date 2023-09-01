import { DocumentData } from "firebase/firestore";
import {
  addUserAcess,
  contactListAcess,
  createChatAcess,
  currentUserAcess,
} from "../dataAcess/userAcess";
import { User } from "@/types/allTypes";

export const addUserAction = async (email: string, name: string) => {
  try {
    const response = await addUserAcess(email, name);
    return response.id;
  } catch (err) {
    console.log("Error adding user:", err);
    return null;
  }
};

export const currentUserAction = async (email: string) => {
  try {
    const currentUser: User | null = await currentUserAcess(email);
    return currentUser;
  } catch (err) {
    console.log("Error ao achar o current user", err);
    return null;
  }
};

export const contactListAction = async (userId: string) => {
  const list: User[] = [];
  const response = await contactListAcess();
  response.forEach((result: DocumentData) => {
    let data = result.data();
    if (result.id != userId) {
      list.push({
        id: result.id,
        name: data.name,
        email: data.email,
        chats: data.chats,
      });
    }
  });
  return list;
};

export const createChatAction = async (u1: User, u2: User) => {
  const response = await createChatAcess(u1, u2);
  return response;
};
