import {useEffect, useState} from "react";
import ChatBubbleComponent from "./ChatBubble/ChatBubbleComponent";

function ConversationComponent() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const fetchMessages = () => {
      fetch("http://localhost:8000/getMessage?skip=0&take=100")
        .then((response) => response.json())
        .then((data) => {
          setMessages(data);
        })
        .catch((error) => {
          console.error("Error fetching:", error);
        });
    };

    fetchMessages();

    const intervalId = setInterval(fetchMessages, 100);

    // Clear timer
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex-grow bg-gray-400 overflow-y-auto shadow-inner">
      <div className="w-20"></div>
      <div className="flex-grow h-full">
        {messages.map((message: ChatMessage) => (
          <ChatBubbleComponent key={message.id} message={message} />
        ))}
      </div>
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