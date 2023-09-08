'use client'

import { useEffect, useState } from "react";
import { Chat, User } from "@/types/allTypes";
import {
  contactListAction,
  createChatAction,
} from "@/services/actions/userActions";

type Props = {
  show: boolean;
  setShow: (e: boolean) => void;
  user: User;
  chatList: Chat[];
};

const NewChat = ({ ...props }: Props) => {
  const [list, setList] = useState<User[]>([]);

  useEffect(() => {
    const getList = async () => {
      if (props.user) {
        let results = await contactListAction(props.user.id);
        setList(results);
      }
    };
    getList();
  }, [props.user]);

  const handleClose = () => {
    props.setShow(false);
  };

  const addNewChat = async (u: User) => {
    await createChatAction(props.user, u);

    handleClose();
  };

  return (
    <div className={`w-56 max-w-md bg-orange-400 flex flex-col }`}>
      <div className="flex bg-stone-900 items-center p-4 text-white">
        <div className="flex-1 text-center text-lg">Nova Conversa</div>
      </div>
      <div className="flex-1 overflow-y-auto scroll__newchat">
        {list.map((item, key) => (
          <div
            onClick={() => addNewChat(item)}
            key={key}
            className="p-4 cursor-pointer hover:bg-stone-800 hover:text-white transition-colors duration-300 text-stone-900"
          >
            <p className="text-lg">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewChat;
