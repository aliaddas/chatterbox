// HeaderComponent.tsx
import React from "react";

interface ChatHeaderProps {
  icon: string;
  name: string;
}

const ChatHeaderComponent: React.FC<ChatHeaderProps> = (chatheader) => {
  return (
    <div className="bg-secondary p-4 border-b-2 flex border-accent">
      <img src={chatheader.icon} alt="" className="w-10" />
      <h1>{chatheader.name}</h1>
    </div>
  );
};

export default ChatHeaderComponent;
