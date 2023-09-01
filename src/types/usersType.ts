// export interface addUserType {
//   name: string;
//   email: string;
// }

// export interface currentUserType {
//   id: string;
//   email: string;
//   name: string;
// }

// export interface contactListType {
//   id: string;
//   name: string;
//   email: string;
// }

// export interface createChatType {
//   id: string;
//   name: string;
// }

// export interface userType {
//   id: string;
//   email: string;
//   name: string;
//   chats: [
//     {
//       chatId: string;
//       lastMessage: string;
//       lasMessageDate: any;
//       title: string;
//       with: string;
//     }
//   ];
// }

// export interface userChatType {
//   chatId: string;
//   lastMessage: string;
//   lastMessageDate: any;
//   title: string;
//   with: string;
// }

// --------------------------------------------------------

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
