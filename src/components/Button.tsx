import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  onClick?: () => void;
};

const Button = ({ ...props }: Props) => {
  return (
    <div
      className="w-10 h-10 rounded-3xl flex items-center justify-center cursor-pointer"
      onClick={props.onClick}
    >
      {props.icon}
    </div>
  );
};

export default Button;
