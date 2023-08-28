import React from "react";
import Image from "next/image";
import { ChatType } from "@/types/ChatTypes";

type Props = {
  onClick: (chatId: number) => void;
  key: number;
  active: boolean;
  data: ChatType;
};

const ChatList = ({ ...props }: Props) => {
  return (
    <div
      className={`flex cursor-pointer items-center h-16 hover:bg-sky-100 ${
        props.active && "bg-indigo-300"
      }`}
      onClick={props.onClick}
    >
      {/* ALL LIST */}
      <div className="flex-1 flex flex-col justify-center h-full border-b border-gray-300 px-2 flex-wrap min-w-0">
        {/* UNIC LIST */}
        <div className="flex justify-between items-center w-full">
          <div className="text-base text-zinc-800">{props.data.title}</div>
          <div className="text-xs text-zinc-500">19:00</div>
        </div>
        {/* UNIC LIST */}
        <div className="flex justify-between items-center w-full text-sm text-zinc-500">
          <p className="overflow-hidden whitespace-nowrap text-ellipsis	m-0">
            Last MessageLast Last MessageLast Last MessageLast Last MessageLast
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
