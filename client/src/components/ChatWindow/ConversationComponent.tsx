import ChatBubbleComponent from "./ChatComponents/ChatBubbleComponent";
import SystemMessage from './ChatComponents/SystemMessageComponent';

import './css/ConversationComponent.css';
import useRoomsContext from '../../hooks/useRoomsContext';
import { useRoom } from '../../hooks/useRoom';

function ConversationComponent() {
  const { selectedRoom } = useRoomsContext();
  const { messages } = useRoom(selectedRoom!)

  return (
    <div className="flex flex-grow  overflow-y-auto h-full">
        <div className="w-20" />
        <div className="flex-grow h-full pb-5">
          {messages.map((message: CombinedMessages) => (
            isSystemMessage(message)
              ? <SystemMessage key={message.type} type={message.type} message={message.payload.newChat}/>
              : <ChatBubbleComponent key={message.ID} message={message} />
          ))}
        </div>
        <div className="w-5" />
      </div>
  );
}

export default ConversationComponent;

type CombinedMessages = ChatMessage | SystemMessage;

type ChatMessage = {
  ID: number;
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
