import {useEffect, useState} from "react";
import ChatBubbleComponent from "./ChatBubble/ChatBubbleComponent";

function ConversationComponent() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/getMessage?skip=0&take=100")
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching:", error);
      });
  }, []);

  return (
    <div className="flex-grow bg-gray-400 overflow-y-auto shadow-inner">
      <div className="w-20"></div>
      <div className="flex-grow h-full">
        {messages.map((message: ChatMessage) => (
          <ChatBubbleComponent key={message.id} message={message} />
        ))}
      </div>
      <div className="w-20"></div>
    </div>
  );
}

export default ConversationComponent;

type ChatMessage = {
  id: number;
  username: string;
  message: string;
  createdAt: Date;
};
