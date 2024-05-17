import { useEffect, useState, useContext } from "react";
import ChatBubbleComponent from "./ChatComponents/ChatBubbleComponent";
import WebSocketContext from '../../context/WebSocketContext'; // import the context
import SystemMessage from './ChatComponents/SystemMessageComponent';

function ConversationComponent() {
  const [messages, setMessages] = useState<CombinedMessages[]>([]); // set the state
  const { webSocket, setWebSocket, send } = useContext(WebSocketContext); // use the context

  useEffect(() => {
    console.log('please')
    if (!webSocket) return;
    console.log(webSocket)

    const instructions = { action: 'getMessages', take: 10, skip: 0 };
    send(JSON.stringify(instructions));

    const messageHandler = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log(data)

      if(data.action === "newChat"){
        console.log('got a new chat', data)
        setMessages(
          currentMessages => ([...currentMessages, { ...data.payload, createdAt: new Date(data.payload.createdAt)}])
        )
      }

      if (data.info === "userConnected") {
        const message = data.payload.message;
        setMessages(
          currentMessages => ([...currentMessages, { type: data.info, payload: message }])
        )
      }
    };

    const errorHandler = (error: Event) => {
      console.log("WebSocket is not reachable. Error:", error);
    };


    webSocket.addEventListener('message', messageHandler);
    // webSocket.addEventListener('error', errorHandler);

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
      {messages.map((message: CombinedMessages) => (
        isSystemMessage(message)
          ? <SystemMessage key={message.type} username={message.payload} />
          : <ChatBubbleComponent key={message.id} message={message} />
      ))}
      </div>
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
