"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  FaPlus,
  FaRightFromBracket,
  FaCommentSlash,
  FaCommentDots,
  FaXmark,
} from "react-icons/fa6";

import ChatList from "@/components/ChatList";
import Intro from "@/components/Intro";
import ChatWindow from "@/components/ChatWindow";
import Login from "@/components/Login";

import NewChat from "@/components/NewChat";

import { useUser } from "@/userContext";
import { Chat } from "@/types/allTypes";
import { chatListOberser } from "@/services/observers/chatsObersers";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebaseconfig";

export default function Home() {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [showNewChat, setShowNewChat] = useState(false);
  const [showChat, setShowChat] = useState(true);

  const uContext = useUser();

  const handleNewChat = () => {
    setShowNewChat(!showNewChat);
    setShowChat(false);
  };

  const handleShowChat = () => {
    setShowChat(!showChat);
    setShowNewChat(false);
  };

  useEffect(() => {
    if (uContext?.user) {
      let unsub = chatListOberser(uContext.user.id, setChatList);
      return unsub;
    }
  }, [uContext?.user]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        uContext?.setUser(null);
        setChatList([]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {uContext?.user ? (
        <div className="flex h-screen">
          <div className="flex flex-col items-center justify-between py-20 w-24 bg-stone-900 h-screen z-50">
            <div className="flex flex-col gap-6">
              <button
                onClick={handleNewChat}
                className="py-2 px-2 text-orange-300 border-2 border-orange-300 rounded-full hover:bg-stone-700"
              >
                {showNewChat ? <FaXmark /> : <FaPlus />}
              </button>
              <button
                onClick={handleShowChat}
                className="py-2 px-2 text-orange-300 border-2 border-orange-300 rounded-full hover:bg-stone-700"
              >
                {showChat ? <FaCommentSlash /> : <FaCommentDots />}
              </button>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 py-2 px-2 text-orange-300 border-2 border-orange-300 rounded-full hover:text-red-500 hover:border-red-500"
            >
              <span>sair</span>
              <FaRightFromBracket />
            </button>
          </div>
          {showNewChat && (
            <NewChat
              show={showNewChat}
              setShow={setShowNewChat}
              user={uContext.user}
              chatList={chatList}
            />
          )}
          {showChat && (
            <>
              <div className="w-56 max-w-md flex flex-col">
                <header className="flex bg-stone-800 text-white text-lg items-center px-4 py-6">
                  <Image
                    src="https://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2019/04/kendrick-lamar.jpg"
                    width={60}
                    height={60}
                    alt="Picture of the author"
                    className="rounded-xl h-14 w-14 object-cover"
                  />
                  <h3 className="ml-4">{uContext?.user?.name}</h3>
                </header>

                <div className="flex-1 px-2 gap-2 bg-stone-700 overflow-y-auto scroll">
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
            </>
          )}

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
