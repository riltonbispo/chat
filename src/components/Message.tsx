'user client'

import React, {useState, useEffect} from "react";
import { MessageType, User } from "@/types/usersType";

type Props = {
  data: MessageType;
  user: User;
};

const Message = ({ ...props }: Props) => {

  const [time, setTime] = useState('')

  useEffect(()=> {
    if (props.data.date > 0) {
      const d = new Date(props.data.date.seconds * 1000);
      const hours = d.getHours();
      const minutes = d.getMinutes();
      const formattedHours = hours < 10 ? '0' + hours : hours.toString();
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
      setTime(`${formattedHours}:${formattedMinutes}`);
    }
  }, [props.data])


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
        <div className="text-right">{time}</div>
      </div>
    </div>
  );
};

export default Message;
