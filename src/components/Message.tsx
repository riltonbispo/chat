import React from "react";
import { MessageType } from "@/types/ChatTypes";

type Props = {
  data: MessageType;
  user: {
    id: number;
    avatar: string;
    name: string;
  };
};

const Message = ({ ...props }: Props) => {
  return (
    // Message Line
    <div
      className={`mb-2.5 flex ${
        props.user.id === props.data.author ? "justify-end" : "justify-start"
      }`}
    >
      {/* // Message Item */}
      <div
        className={`${
          props.user.id === props.data.author ? "bg-white " : "bg-emerald-100"
        } rounded-sm  flex flex-col p-2 max-w-3xl`}
      >
        {/* Message Text */}
        <div className="">{props.data.body}</div>
        {/* Message Date */}
        <div className="text-right">20:00</div>
      </div>
    </div>
  );
};

export default Message;
