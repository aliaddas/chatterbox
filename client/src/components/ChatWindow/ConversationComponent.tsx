import { useEffect, useState, useContext } from "react";
import ChatBubbleComponent from "./ChatBubble/ChatBubbleComponent";
import WebSocketContext from '../../context/WebSocketContext'; // import the context

function ConversationComponent() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { webSocket, setWebSocket, send } = useContext(WebSocketContext); // use the context

  useEffect(() => {
    if (!webSocket) return;

    const instructions = { action: 'getMessages', take: 10, skip: 0 };
    send(JSON.stringify(instructions));

    const messageHandler = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      // Requested messages received
      if (data.info === "getMessagesSuccess") {
        console.log("Messages received:")
        console.log(data);
        setMessages(data.messages);
      }
      // Requested message added
      else if(data.info === "addMessageSuccess") {
        console.log("Message added successfully");
        // Request the messages again for UI
        send(JSON.stringify(instructions));
      }
    };

    const errorHandler = (error: Event) => {
      console.log("WebSocket is not reachable. Error:", error);
    };


    webSocket.addEventListener('message', messageHandler);
    webSocket.addEventListener('error', errorHandler);

    setWebSocket(webSocket);
    return () => {
      if (webSocket) {
        webSocket.removeEventListener('message', messageHandler);
        webSocket.removeEventListener('error', errorHandler);
      }
    };

  }, [webSocket, setWebSocket, send, setMessages]);

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