// App.tsx
import "./App.css";
import { useCallback, useEffect, useState } from "react";
import ChatWindow from "./components/ChatWindow";
import SideBarMenu from "./components/ChatWindow/SideBarMenu";
import UserContext from "./context/UserContext";
import LoginWindow from "./components/AuthWindow/LoginWindow";
import WebSocketContext from "./context/WebSocketContext";

import { Room } from "../../server/contract";
import RoomsContext from './context/RoomsContext';

function App() {
  const [username, setUsername] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>({
    ID: 'general',
    name: 'General'
  });
  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  const loadRooms = useCallback(
    async () => {
      try {
        const response = await fetch(`http://localhost:7000/getRooms`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const fetchedRooms = await response.json();
        console.log("Fetched Rooms:", fetchedRooms);
        setAllRooms(fetchedRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    },
    [setAllRooms]
  )

  const selectRoom = useCallback((room: Room) => {
    setSelectedRoom(room);
  },
  [setSelectedRoom]);

  const createRoom = useCallback(
    async(roomName: string) => {
      return fetch(`http://localhost:7000/createRoom`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomName })
        }).then(r => r.json())
    },
    []
  )

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
      <UserContext.Provider value={{ username, setUsername}}>
        <RoomsContext.Provider value={{ selectedRoom, allRooms, loadRooms, selectRoom, createRoom }}>
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
        </RoomsContext.Provider>
      </UserContext.Provider>
    </WebSocketContext.Provider>
  );
}

export default App;