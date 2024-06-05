import { FC } from "react";
import { TbMessageChatbot } from "react-icons/tb";
import { Button } from "./ui/button";

interface HeaderProps {
  onSave: () => void;
  onClear: () => void;
}

const Header: FC<HeaderProps> = ({ onSave, onClear }) => {
  return (
    <nav className="h-[8vh] bg-slate-50 flex items-center px-8 gap-x-4 border-b border-black ">
      <TbMessageChatbot size={44} />
      <h1 className="text-3xl font-light leading-tight mr-auto">
        Chatbot Flow Builder
      </h1>
      <Button onClick={onSave}>Save Changes</Button>
      <Button variant="outline" onClick={onClear}>
        Clear All
      </Button>
    </nav>
  );
};

export default Header;
