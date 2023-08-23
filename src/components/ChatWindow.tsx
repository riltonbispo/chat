"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import SearchIcon from "@mui/icons-material/Search";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker from "emoji-picker-react";

import { AllMessages } from "@/utils/data";
import { MessageType, UserType } from "@/types/ChatTypes";

import Button from "@/components/Button";
import Message from "./Message";
import "./ChatWindow.css";

const ChatWindow = ({ user }: { user: UserType }) => {
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState("");
  const [list, setList] = useState<MessageType[]>(AllMessages);
  const body = useRef<null | HTMLDivElement>(null);

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

  const handleSendClick = () => {};

  return (
    <div className="flex flex-col h-full">
      <header className="h-16 border-b-2 border-blue-700 flex justify-between items-center ">
        {/* HEADER INFO */}
        <div className="flex items-center cursor-pointer">
          <Image
            src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
            width={40}
            height={40}
            alt="Picture of the author"
            className="rounded-full mx-2 "
          />
          <div className="text-base">Name</div>
        </div>
        {/* HEADER BUTTONS */}
        <div className="flex items-center ml-3.5">
          <Button icon={<SearchIcon />} />
          <Button icon={<SearchIcon />} />
          <Button icon={<SearchIcon />} />
        </div>
      </header>

      {/* BODY */}
      <div
        ref={body}
        className="flex-1 overflow-y-auto bg-indigo-100 py-2 px-4 scroll"
      >
        {list.map((item, key) => (
          <Message key={key} data={item} user={user} />
        ))}
      </div>

      {/* EMOJI AREA */}
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

      {/* FOOTER */}
      <div className="h-16 flex items-center">
        {/* PRE */}
        <div className="flex mx-4">
          {emojiOpen && (
            <Button icon={<CloseIcon />} onClick={handleCloseEmoji} />
          )}
          <Button
            icon={
              <AlternateEmailIcon
                className={`${emojiOpen && "text-indigo-600"}`}
              />
            }
            onClick={handleOpenEmoji}
          />
        </div>

        {/* INPUT */}
        <div className="flex-1">
          <input
            type="text"
            className="w-full h-10 border-0 outline-0 rounded-full pl-4 bg-indigo-50"
            placeholder="Digite sua Mensagem"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* POS */}
        <div className="flex mx-4">
          <Button icon={<SendIcon />} onClick={handleSendClick} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
