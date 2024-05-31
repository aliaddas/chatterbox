import { useEffect, useState, useContext, useRef } from "react";
import ChatBubbleComponent from "./ChatComponents/ChatBubbleComponent";
import WebSocketContext from '../../context/WebSocketContext'; // import the context
import SystemMessage from './ChatComponents/SystemMessageComponent';

import './css/ConversationComponent.css';
import useProfileContext from '../../hooks/useProfileContext';

function ConversationComponent() {
  const [messages, setMessages] = useState<CombinedMessages[]>([]); // set the state
  const { webSocket, send } = useContext(WebSocketContext); // use the context
  const containerRef = useRef<HTMLDivElement>(null);
  const containerElement = containerRef.current;
  const { username } = useProfileContext();

  useEffect(() => {
    if (!webSocket) return;

    const instructions = { action: 'getMessages', take: 10, skip: 0 };
    send(JSON.stringify(instructions));

    const messageHandler = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if(data.action === "newChat"){
        setMessages(
          currentMessages => ([...currentMessages, { ...data.payload, createdAt: new Date(data.payload.createdAt)}])
        )
      }

      if (data.info === "userConnected") {
        const message = data.payload;

        if(messages.length === 0){
          // Add a welcome message if the chat is empty
          setMessages([...messages, { type: "userJoined", payload: username }])
        }
        setMessages(
          currentMessages => ([...currentMessages, { type: data.info, payload: message }])
        )
      }
    };

    const errorHandler = (error: Event) => {
      console.log("WebSocket is not reachable. Error:", error);
    };

    webSocket.addEventListener('message', messageHandler);
    webSocket.addEventListener('error', errorHandler);

    return () => {
      if (webSocket) {
        webSocket.removeEventListener('message', messageHandler);
        webSocket.removeEventListener('error', errorHandler);
      }
    };

  }, [webSocket, send, setMessages, containerElement, messages, username]);

  return (
    <div ref={containerRef} className="flex flex-grow  overflow-y-auto h-full">
        <div className="w-20" />
        <div className="flex-grow h-full pb-5">
          {messages.map((message: CombinedMessages) => (
            isSystemMessage(message)
              ? <SystemMessage key={message.type} type={message.type} message={message.payload}/>
              : <ChatBubbleComponent key={message.id} message={message} />
          ))}
        </div>
        <div className="w-5" />
      </div>
  );
}

export default ConversationComponent;

type CombinedMessages = ChatMessage | SystemMessage;

type ChatMessage = {
  id: number;
  username: string;
  message: string;
  createdAt: Date;
};

type SystemMessage = {
  type: string
  payload: any
}

function isSystemMessage(message: CombinedMessages): message is SystemMessage {
  return (message as SystemMessage).type !== undefined;
}
