import { useEffect, useState, useContext, useRef } from "react";
import ChatBubbleComponent from "./ChatComponents/ChatBubbleComponent";
import WebSocketContext from '../../context/WebSocketContext'; // import the context
import SystemMessage from './ChatComponents/SystemMessageComponent';

import './css/ConversationComponent.css';
import useUserContext from '../../hooks/useUserContext';
import { Room } from "../../../../server/contract";

function ConversationComponent() {
  const [roomMessages, setRoomMessages] = useState<{ [key: string]: CombinedMessages[] }>({}); // set the state
  const { webSocket, send } = useContext(WebSocketContext); // use the context
  const containerRef = useRef<HTMLDivElement>(null);
  const containerElement = containerRef.current;
  const { username } = useUserContext();
  const { roomName, setRoomName } = useUserContext();
  const { rooms, setRooms } = useUserContext();
  const [roomID, setRoomID] = useState<string>("general");

  const currentRoomMessages = roomMessages[roomID] || [];

  async function fetchRooms() {
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

      const formattedRooms: Room[] = fetchedRooms.map((room: any) => {
        return {
          ID: room.id,
          name: room.name
        }});
      setRooms(formattedRooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  }

  console.log("Mounted Rooms:", rooms);
  console.log("Selected Room:", roomName);
  useEffect(() => {
  fetchRooms();
}, []);

  useEffect(() => {
    //! No Websocket found
    if (!webSocket) return;


    //#
    //# Message Handler
    //#
    const messageHandler = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.action === "userJoinedRoom") {

        //? Create a new room object for checks
        const parseRoom: Room = {
          ID: data.payload.roomName,
          name: data.payload.roomName
        };

        //# Map names to array
        const checkingRooms = rooms.map((room) => room.name);

        //! Does not include name
        if(!checkingRooms.includes(parseRoom.name)){
          console.log("Room doesn't exist in array yet");
          //# Append to rooms
          setRooms([...rooms, parseRoom]);
        }

        //# Set the room name
        //*(general by default sent from server)
        if(parseRoom.name === "general"){
          setRoomName(parseRoom.name)
        }
      }

      if (data.info === "userConnected") {
        console.log(data.payload)

        // const { roomID, ...message } = data.payload;

        // setRoomMessages(prevState => {
        //   // If room doesn't exist yet, create it
        //   if (!prevState[roomID]) {
        //     prevState[roomID] = [];
        //   }

        //   // If this is the first message in the room, add a welcome message
        //   if (prevState[roomID].length === 0) {
        //     prevState[roomID].push({ type: "userJoined", payload: username });
        //   }

        //   // Add the new message
        //   prevState[roomID].push({ type: data.info, payload: message });

        //   // Return new state
        //   return { ...prevState };
        // });
      }

      if (data.action === "newChat") {
        console.log(data.payload)
        setRoomID(data.payload.roomID);
        const newMessage = { ...data.payload.newChat, createdAt: new Date(data.payload.newChat.createdAt) };

        setRoomMessages(prevState => {
          // If room doesn't exist yet, create it
          if (!prevState[roomID]) {
            prevState[roomID] = [];
          }

          // Add new message to the room
          prevState[roomID].push(newMessage);

          // Return new state
          return { ...prevState };
        });

        console.log(roomMessages)
      }
    };

    const errorHandler = (error: Event) => {
      console.log("WebSocket is not reachable. Error:", error);
    };

    //@ Event Listeners
    webSocket.addEventListener('message', messageHandler);
    webSocket.addEventListener('error', errorHandler);

    return () => {
      if (webSocket) {
        webSocket.removeEventListener('message', messageHandler);
        webSocket.removeEventListener('error', errorHandler);
      }
    };

  },
  [
    webSocket,
    send,
    setRoomMessages,
    containerElement,
    roomMessages,
    username
  ]);

  return (
    <div ref={containerRef} className="flex flex-grow  overflow-y-auto h-full">
        <div className="w-20" />
        <div className="flex-grow h-full pb-5">
          {currentRoomMessages.map((message: CombinedMessages) => (
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
