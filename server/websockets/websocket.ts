//>
//> Imports
//>

//> Services
import { chatService } from '../services/chatservice.ts';
import { roomService } from '../services/roomservice.ts';

//> Bus
import EventBus from '../bus/eventbus.ts';
import console from 'node:console';

//> Type
import { Disposable, EvntBusAction } from '../contract.ts'
import { Response } from "https://deno.land/x/oak@14.2.0/response.ts";

let port = 0;

function handler(req: Request) {
  //? Connected Users Array
  const connectedUsers: string[] = [];
  console.log(`Server: WebSocket Running... [${port}]`);

  //? Connected User
  const connectedUser = new URL(req.url).searchParams.get("username");

  //? Socket Handler
  let SocketHandler: Disposable | null = null

  //! Websocket not available
  if (req.headers.get("upgrade") !== "websocket") {
    //=> Return 501 Not Implemented
    return new Response("WebSocket Not Implemented", { status: 501 });
  }

  //! User not defined
  if (!connectedUser) {
    //=> Return 400 Bad Request
    return new Response("Username Missing", { status: 400 });
  }

  //! Username already exists
  if(connectedUsers.includes(connectedUser)) {
    return new Response("Username Already Exists", { status: 400 });
  }

  //? Socket & Response
  const { socket, response } = Deno.upgradeWebSocket(req); //# Upgrade request to WebSocket

  //# Add User to Connected the list
  connectedUsers.push(connectedUser);

  //# Send User Connected
  const sendUserConnected = () => {

    //<< Get Rooms
    const rooms = roomService.getRooms().map((room) => room.name);

    //# Create General Room if it doesn't exist
    if(!rooms.includes("general")){
      roomService.createRoom("general");
    }
    const joinRoom: EvntBusAction = {
      type: "userJoinedRoom",
      payload: {
        roomName: "general",
        username: connectedUser,
      }};

    const connectAction: EvntBusAction = {
      type: "userConnected",
      payload: {
        username: connectedUser,
      }};

    EventBus.notify(joinRoom); //=> Notify the EventBus new user joined general
    EventBus.notify(connectAction); //=> Notify the EventBus new user connected
  };

  //* Wait 10ms before caling sendUserConnected
  const submitTimeout = setTimeout(sendUserConnected, 10);

  //@
  //@ Listeners
  //@

  //@ On Message
  socket.addEventListener("open", async () => {
    console.log(`Connection to ${connectedUser}`);

    SocketHandler = await EventBus.subscribe(
      {},
      async (message) => {
        console.log(message)

        if (message.type === "userJoinedRoom") {
          const instructions = {
            action: "userJoinedRoom",
            payload: {
              roomName: message.payload.roomName,
              username: message.payload.username
            }};
          socket.send(JSON.stringify(instructions)); //=>
        }

        if (message.type === "userConnected") {
          const instructions = { info: "userConnected", payload: message.payload.username };
          socket.send(JSON.stringify(instructions)); //=>
        }

        if (message.type === "userDisconnected") {
          const instructions = { info: "userDisconnected", payload: connectedUser };
          socket.send(JSON.stringify(instructions)); //=>
        }

        if (message.type === "newChat") {
          const fetchedChat = await chatService.getByID({ ID: message.payload.chatID });

          if (fetchedChat) {

            const roomID = roomService.getRoomIDByName(fetchedChat.roomName)
            const newChat = {
              ID: fetchedChat.ID,
              username: fetchedChat.username,
              message: fetchedChat.message,
              targetRoom: roomID,
              createdAt: fetchedChat.createdAt,
            }
            const instructions = {
              action: "newChat",
              payload: {
                newChat,
              }};
            socket.send(JSON.stringify(instructions)); //=>
          }
        }
      }
    );
  });

  //@ On Close
  socket.addEventListener("close", () => {
    clearTimeout(submitTimeout); //* clear the timeout when the socket closes

    //# Notify User Disconnected
    connectedUsers.splice(connectedUsers.indexOf(connectedUser), 1);

    //# Dispose Socket Handler
    SocketHandler?.dispose()

    console.log(`Connection to ${connectedUser} closed.`);
  });

  return response;
}

export default function startWebSocket(portArg: number) {
  port = portArg;
  Deno.serve(handler, { port });
}