// App.tsx
import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import ChatWindow from "./components/ChatWindow";
import SideBarMenu from "./components/ChatWindow/SideBarMenu";
import ProfileContext from "./context/ProfileContext";
import LoginWindow from "./components/AuthWindow/LoginWindow";
import WebSocketContext from "./context/WebSocketContext";

function App() {
  const [username, setUsername] = useState("");
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  // Check every 5 seconds if the WebSocket is still open
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (webSocket && webSocket.readyState !== WebSocket.OPEN) {
        setWebSocket(null);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [webSocket]);

  return (
    <WebSocketContext.Provider value={{
      webSocket,
      setWebSocket,
      send(...args) {
        console.log(...args)
      },
      addEventListener: () => {},
      removeEventListener: () => {},
      onOpen: () => {}, onError: () => {}, onClose: (callback: (event: CloseEvent) => void) => {} }}
    >
      <ProfileContext.Provider value={{ username, setUsername }}>
        <div className="flex h-screen w-screen bg-[rgb(12,5,16)]">
          {username === "" || webSocket === null ? (
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