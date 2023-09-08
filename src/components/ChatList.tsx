'use client'

import React, { useEffect, useState } from "react";
import { Chat } from "@/types/allTypes";

type Props = {
  active: boolean;
  data: Chat;
};

const ChatList = ({ ...props }: Props) => {
  const [time, setTime] = useState('')

  useEffect(()=> {
    if (props.data.lastMessageDate > 0) {
      const d = new Date(props.data.lastMessageDate.seconds * 1000);
      const hours = d.getHours();
      const minutes = d.getMinutes();
      const formattedHours = hours < 10 ? '0' + hours : hours.toString();
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
      setTime(`${formattedHours}:${formattedMinutes}`);
    }
  }, [props.data])

  return (
    <div
      className={`flex cursor-pointer items-center h-16 hover:bg-stone-500 rounded-lg my-2 ${
        props.active && "bg-stone-900 hover:bg-stone-900"
      }`}
    >
      <div className="flex-1 flex flex-col justify-center h-full px-2 flex-wrap min-w-0">
        <div className="flex justify-between items-center w-full">
          <div
            className={`text-base font-medium ${
              props.active ? "text-orange-400" : "text-zinc-100"
            }`}
          >
            {props.data.title}
          </div>
          <div className="text-xs text-zinc-300">{time}</div>
        </div>
        <div className="flex justify-between items-center w-full text-sm text-zinc-300">
          <p className="overflow-hidden whitespace-nowrap text-ellipsis	m-0">
            {props.data.lastMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
