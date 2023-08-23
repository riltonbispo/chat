import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

import Button from "@/components/Button";

const HeaderButtons = () => {
  return (
    <div className="flex">
      <Button icon={<AlternateEmailIcon />}/>
      <Button icon={<AlternateEmailIcon />}/>
      <Button icon={<AlternateEmailIcon />}/>
    </div>
  );
};

export default HeaderButtons;
