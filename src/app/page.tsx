"use client";

import { useEffect, useState } from "react";

import { RiAddLine } from "react-icons/ri";

import ChatList from "@/components/ChatList";
import Intro from "@/components/Intro";
import ChatWindow from "@/components/ChatWindow";
import Login from "@/components/Login";

import NewChat from "@/components/NewChat";
import Button from "@/components/Button";

import { useUser } from "@/userContext";
import { onChatList } from "@/lib/firebaseconfig";
import { Chat } from "@/types/allTypes";

export default function Home() {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [showNewChat, setShowNewChat] = useState(false);

  const uContext = useUser();

  const handleNewChat = () => {
    setShowNewChat(true);
  };

  useEffect(() => {
    if (uContext?.user) {
      let unsub = onChatList(uContext?.user.id, setChatList);
      return unsub;
    }
  }, [uContext?.user]);

  return (
    <>
      {uContext?.user ? (
        <div className="flex h-screen">
          <div className="w-1/3 max-w-md flex flex-col border border-blue-600 ">
            <NewChat
              show={showNewChat}
              setShow={setShowNewChat}
              user={uContext.user}
              chatList={chatList}
            />
            {/* HEADER */}
            <header className="h-16 flex justify-between items-center px-4">
              <h3>{uContext?.user?.name}</h3>
              <Button icon={<RiAddLine />} onClick={handleNewChat} />
            </header>

            {/* CHAT LIST */}
            <div className="flex-1 bg-white overflow-y-auto scroll">
              {chatList?.map((item, key) => (
                <div key={key} onClick={() => setActiveChat(item)}>
                  <ChatList
                    data={item}
                    active={activeChat?.chatId === item.chatId}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CONTENT AREA */}
          <div className="flex-1">
            {activeChat ? (
              <ChatWindow user={uContext.user} data={activeChat} />
            ) : (
              <Intro />
            )}
          </div>
        </div>
      ) : (
        <Login></Login>
      )}
    </>
  );
}
