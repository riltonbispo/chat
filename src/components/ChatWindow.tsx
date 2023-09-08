"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { RiEmojiStickerLine, RiSendPlaneFill, RiCloseLine } from "react-icons/ri";
import { FaRegFaceGrin, FaXmark } from "react-icons/fa6";

import EmojiPicker from "emoji-picker-react";

import Button from "@/components/Button";
import Message from "./Message";
import "./ChatWindow.css";
import { Chat, MessageType, User, chatUsers } from "@/types/allTypes";
import { chatContentObserver } from "@/services/observers/chatsObersers";
import { sendMessageChatAction } from "@/services/actions/chatActions";

type Props = {
  user: User;
  data: Chat;
};

const initialUsersState: chatUsers = [];

const ChatWindow = ({ user, data }: Props) => {
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState("");
  const [list, setList] = useState<MessageType[]>([]);
  const [users, setUsers] = useState<chatUsers>(initialUsersState);
  const body = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    setList([]);
    let unsub = chatContentObserver(data.chatId, setList, setUsers);
    return unsub;
  }, [data.chatId]);

  useEffect(() => {
    if (body.current && body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop =
        body.current.scrollHeight - body.current.offsetHeight;
    }
  }, [list]);

  const handleOpenEmoji = () => {
    setEmojiOpen(true);
  };
  const handleCloseEmoji = () => {
    setEmojiOpen(false);
  };

  const handleSendClick = () => {
    if (text !== "") {
      sendMessageChatAction(data.chatId, user.id, text, users);
      setText("");
      setEmojiOpen(false);
    }
  };

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      handleSendClick();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="h-16 border-b-2 border-blue-700 flex justify-between items-center ">
        <div className="flex items-center px-6 gap-2">
          <Image
            src="https://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2019/04/kendrick-lamar.jpg"
            width={60}
            height={60}
            alt="Picture of the author"
            className="rounded-xl h-14 w-14 object-cover"
          />
          <div className="text-xl">{data.title}</div>
        </div>
      </header>

      <div
        ref={body}
        className="flex-1 overflow-y-auto bg-stone-800 py-2 px-4 scroll"
      >
        {list.map((item, key) => (
          <Message key={key} data={item} user={user} />
        ))}
      </div>

      <div
        className={`${
          emojiOpen ? "h-80" : "h-0"
        } overflow-y-hidden transition-all ease-in-out duration-100`}
      >
        <EmojiPicker
          searchDisabled
          onEmojiClick={(emojiData) => setText(text + emojiData.emoji)}
        />
      </div>

      <div className="h-16 flex items-center">
        <div className="flex mx-4">
          {emojiOpen ? (
            <button onClick={handleCloseEmoji}>
              <FaXmark />
            </button>
          ) : (
            <button onClick={handleOpenEmoji}>
              <FaRegFaceGrin />
            </button>
          )}
        </div>

        <div className="flex-1">
          <input
            type="text"
            className="w-full h-10 border-0 outline-0 rounded-full pl-4 border-2 border-stone-800"
            placeholder="Digite sua Mensagem"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyUp={handleInputKeyUp}
          />
        </div>

        <div className="flex mx-4">
          <Button icon={<RiSendPlaneFill />} onClick={handleSendClick} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
