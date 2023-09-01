'use client'

import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { UserType, ChatType } from "@/types/ChatTypes";
import { contactList, createChat } from "@/lib/firebaseconfig";
import { RiArrowLeftLine } from "react-icons/ri";
import { Chat, User } from "@/types/usersType";

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
        let results = await contactList(props.user.id);
        setList(results);
      }
    };
    getList();
  }, [props.user]);

  const handleClose = () => {
    props.setShow(false);
  };

  const addNewChat = async (u: User) => {
    await createChat(props.user, u);

    handleClose();
  };

  return (
    <div
      className={`w-1/3 max-w-md fixed top-0 bottom-0 bg-white flex flex-col ${
        props.show ? "left-0" : "-left-full"
      }`}
    >
      {/* Header */}
      <div className="flex bg-indigo-600 items-center">
        <div>Nova conversa</div>
        <Button icon={<RiArrowLeftLine />} onClick={handleClose} />
      </div>
      {/* List */}
      <div className="flex-1 overflow-y-auto scroll">
        {list.map((item, key) => (
          <div
            onClick={() => addNewChat(item)}
            key={key}
            className="p-4 cursor-pointer gap-4 hover:bg-indigo-300"
          >
            <p>{item.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewChat;
