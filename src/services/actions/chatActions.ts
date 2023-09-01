import { chatUsers } from "@/types/allTypes";
import { sendMessageChatAcess } from "../dataAcess/chatAcess";

export const sendMessageChatAction = async (
  chatId: string,
  userId: string,
  body: string,
  users: chatUsers
) => {
  try {
    await sendMessageChatAcess(chatId, userId, body, users);
  } catch (error) {
    console.error("Erro ao enviar mensagem para o chat:", error);
  }
};
