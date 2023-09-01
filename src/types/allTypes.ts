export type User = {
  id: string;
  chats: Chat[];
  email: string;
  name: string;
};

export type Chat = {
  chatId: string;
  title: string;
  with: string;
  lastMessage: any;
  lastMessageDate: any;
};

export type ChatCollection = {
  [chatId: string]: ChatData;
};

export type ChatData = {
  messages: MessageType[];
};

export type MessageType = {
  author: string;
  body: string;
  date: any;
  type: string;
};
