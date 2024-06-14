// App.tsx
import "./App.css";
import { useEffect, useState } from "react";
import ChatWindow from "./components/ChatWindow";
import SideBarMenu from "./components/ChatWindow/SideBarMenu";
import UserContext from "./context/UserContext";
import LoginWindow from "./components/AuthWindow/LoginWindow";
import WebSocketContext from "./context/WebSocketContext";
import { Room } from "../../server/contract";

function App() {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);

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
      <UserContext.Provider value={{ username, setUsername, roomName, setRoomName, rooms, setRooms }}>
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
      </UserContext.Provider>
    </WebSocketContext.Provider>
  );
}

export default App;