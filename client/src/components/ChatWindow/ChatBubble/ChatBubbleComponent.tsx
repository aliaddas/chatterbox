// ChatBubbleComponent.tsx
import React from "react";

interface ChatBubbleProps {
  message: string;
  date: string;
}

const ChatBubbleComponent: React.FC<ChatBubbleProps> = ({message, date}) => {
  return (
    <div className="bg-slate-300 w-6/12 h-min m-5 p-3 rounded-md">
      <p>{message}</p>
      <p>{date}</p>
    </div>
  );
};

export default ChatBubbleComponent;
