// App.tsx
import React, { useEffect, useState } from "react";
import "./App.css";
import ChatWindow from "./components/ChatWindow";
import SideBarMenu from "./components/ChatWindow/SideBarMenu";
import ProfileContext from "./context/ProfileContext";
import LoginWindow from "./components/AuthWindow/LoginWindow";
import WebSocketContext from "./context/WebSocketContext";

function App() {
  const [username, setUsername] = useState("");
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);


  useEffect(() => {

    // Wait 500ms before creating the WebSocket
    const socketDelay = setTimeout(() => {
    let instanceWS: React.SetStateAction<WebSocket | null>;
    instanceWS = new WebSocket('ws://localhost:8000');

    instanceWS.onopen = () => {
      console.log('WebSocket connection opened (App)');
    }

    instanceWS.onclose = () => {
      console.log('WebSocket connection closed');
    }

    instanceWS.onerror = (event) => {
      console.error('WebSocket error', event);
    }

    setWebSocket(instanceWS);
  }, 500);

  return () => {
    clearTimeout(socketDelay);
    if (webSocket && typeof webSocket !== 'function') {
      webSocket.close();
    }
  };
  }, []);

  const send = (data: string) => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(data);
    }
  };

  return (
    <WebSocketContext.Provider value={{ webSocket, setWebSocket() {}, send, addEventListener: () => {}, removeEventListener: () => {}, onOpen: () => {}, onError: () => {}, onClose: (callback: (event: CloseEvent) => void) => {} }}>
      <ProfileContext.Provider value={{ username, setUsername }}>
        <div className="flex h-screen w-screen">
          {username === "" ? (
            <LoginWindow />
          ) : (
            <>
              <SideBarMenu />
              <ChatWindow />
            </>
          )}
        </div>
      </ProfileContext.Provider>
    </WebSocketContext.Provider>
  );
}

export default App;