"use client";

import Image from "next/image";
import { useState } from "react";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

import HeaderButtons from "@/components/HeaderButtons";
import ChatList from "@/components/ChatList";
import Intro from "@/components/Intro";
import ChatWindow from "@/components/ChatWindow";
import Search from "@/components/Search";

import { ChatType, UserType } from "@/types/ChatTypes";
import { AllChats, User } from "@/utils/data";
import NewChat from "@/components/NewChat";
import Button from "@/components/Button";

export default function Home() {
  const [chatList, setChatList] = useState<ChatType[]>(AllChats);

  const [activeChat, setActiveChat] = useState<ChatType | null>(null);
  const [user, setUser] = useState<UserType>(User);
  const [showNewChat, setShowNewChat] = useState(false);

  const handleNewChat = () => {
    setShowNewChat(true);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 max-w-md flex flex-col border border-blue-600">
        <NewChat
          show={showNewChat}
          setShow={setShowNewChat}
          user={user}
          chatList={chatList}
        />
        {/* HEADER */}
        <header className="h-16 flex justify-between items-center px-4">
          <Image
            src={user.avatar}
            width={40}
            height={40}
            alt="Picture of the author"
            className="rounded-full"
          />
          <Button icon={<AlternateEmailIcon />} onClick={handleNewChat} />
          <HeaderButtons />
        </header>

        {/* SEARCH */}
        <div className="bg-zinc-300 border-b-2 border-blue-700 px-4 py-1.5">
          <Search />
        </div>

        {/* CHAT LIST */}
        <div className="flex-1 bg-white overflow-y-auto scroll">
          {chatList.map((item, key) => (
            <ChatList
              key={key}
              data={item}
              onClick={() => setActiveChat(item)}
              active={activeChat?.chatId === item.chatId}
            />
          ))}
        </div>
      </div>
      {/* CONTENT AREA */}
      <div className="flex-1">
        {activeChat ? <ChatWindow user={user} /> : <Intro />}
      </div>
    </div>
  );
}
