import { useEffect } from 'react';
import ConversationComponent from "./ConversationComponent";
import HeaderComponent from "./HeaderComponent";
import MessageBoxComponent from "./MessageBoxComponent";
import useRoomsContext from '../../hooks/useRoomsContext';


function ChatWindow() {
  const { loadRooms } = useRoomsContext();

  useEffect(() => {
    loadRooms();
  }, [])

  return (
    <div className="flex flex-col flex-grow">
      <HeaderComponent />
      <ConversationComponent />
      <MessageBoxComponent />
    </div>
  );
}

export default ChatWindow;
