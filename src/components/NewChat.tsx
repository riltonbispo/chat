import Button from "@/components/Button";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { useState } from "react";
import Image from "next/image";
import { UserType, ChatType } from "@/types/ChatTypes";

type Props = {
  show: boolean
  setShow: (e: boolean) => void
  user: UserType
  chatList: ChatType[]
}

const NewChat = ({...props} : Props) => {
  const [list, setList] = useState([
    {
      id: 123,
      avatar:
        "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png",
      name: "Name teste",
    },
    {
      id: 123,
      avatar:
        "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png",
      name: "Name teste",
    },
    {
      id: 123,
      avatar:
        "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png",
      name: "Name teste",
    },
    {
      id: 123,
      avatar:
        "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png",
      name: "Name teste",
    },
    {
      id: 123,
      avatar:
        "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png",
      name: "Name teste",
    },
  ]);

  const handleClose = () => {
    props.setShow(false)
  }
  return (
    <div className={`max-w-sm w-1/3 fixed top-0 bottom-0 bg-white flex flex-col ${props.show ? 'left-0' : '-left-full' }`}>
      {/* Header */}
      <div className="flex bg-indigo-600 items-center ">
        <Button icon={<AlternateEmailIcon />}  onClick={handleClose}/>
        <div className="text-white">Nova conversa</div>
      </div>
      {/* List */}
      <div className="flex-1 overflow-y-auto scroll">
        {list.map((item, key) => (
          <div key={key} className="flex items-center p-4 cursor-pointer gap-4 hover:bg-indigo-300">
            <Image
              src={item.avatar}
              width={50}
              height={50}
              alt="Picture of the author"
              className="rounded-full"
            />
            <div>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewChat;
