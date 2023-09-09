import {
  FaPlus,
  FaRightFromBracket,
  FaCommentSlash,
  FaCommentDots,
  FaXmark,
} from "react-icons/fa6";

type Props = {
  showChat: boolean;
  showNewChat: boolean;
  action1: () => void;
  action2: () => void;
  action3: () => void;
};

const Menu = ({ ...props }: Props) => {
  return (
    <div className="flex flex-col items-center justify-between py-20 w-24 bg-stone-900 h-screen z-50">
      <div className="flex flex-col gap-6">
        <button
          onClick={props.action1}
          className="py-2 px-2 text-orange-300 border-2 border-orange-300 rounded-full hover:bg-stone-700"
        >
          {props.showNewChat ? <FaXmark /> : <FaPlus />}
        </button>
        <button
          onClick={props.action2}
          className="py-2 px-2 text-orange-300 border-2 border-orange-300 rounded-full hover:bg-stone-700"
        >
          {props.showChat ? <FaCommentSlash /> : <FaCommentDots />}
        </button>
      </div>
      <button
        onClick={props.action3}
        className="flex items-center gap-2 py-2 px-2 text-orange-300 border-2 border-orange-300 rounded-full hover:text-red-500 hover:border-red-500"
      >
        <span>sair</span>
        <FaRightFromBracket />
      </button>
    </div>
  );
};

export default Menu;
