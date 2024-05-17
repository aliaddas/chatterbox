import { useEffect, useState } from 'react';
import ConversationComponent from "./ConversationComponent";
import HeaderComponent from "./HeaderComponent";
import MessageBoxComponent from "./MessageBoxComponent";


function ChatWindow() {
  return (
    <div className="flex flex-col flex-grow">
      <HeaderComponent />
      <ConversationComponent />
      <MessageBoxComponent />
    </div>
  );
}

export default ChatWindow;
