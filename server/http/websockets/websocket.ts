//>
//> Imports
//>

//> Bus
import EventBus from '../../bus/eventbus.ts';

//> Type
import { Disposable, EvntBusAction, UserJoinRoomNotification, NewChatMsg } from '../../contract.ts'
import { Response } from "https://deno.land/x/oak@14.2.0/response.ts";

let port = 0;

//? Connected Users Array
const connectedUsers: string[] = [];

function handler(req: Request) {
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
    // TODO: FIX this
    return new Response("Username Already Exists", { status: 400 });
  }

  //? Socket & Response
  const { socket, response } = Deno.upgradeWebSocket(req); //# Upgrade request to WebSocket

  //# Add User to Connected the list
  connectedUsers.push(connectedUser);

  //# Send User Connected

  //* Wait 10ms before caling sendUserConnected

  //@
  //@ Listeners
  //@

  //@ On Message
  socket.addEventListener("open", async () => {
    console.log(`Connection to ${connectedUser}`);
    sendUserConnected(socket, connectedUser);

    SocketHandler = await EventBus.subscribe(
      {},

      // TODO: refactor into multiple handlers
      async (message) => {
        console.log(message)

        switch (message.type) {
          case "userJoinedRoom":
            handleJoinRoom(message, socket);
            break;
          case "userConnected":
            handleUserConnected(message,socket);
            break;
          case "newChat":
            handleNewChat(message, socket);
            break;
        }



        /* if (message.type === "userDisconnected") {
          const instructions = { info: "userDisconnected", payload: connectedUser };
          socket.send(JSON.stringify(instructions)); //=>
        } */

      }
    );
  });

  //@ On Close
  socket.addEventListener("close", () => {

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

// --
// Internal
// --

const sendUserConnected = async (socket: WebSocket, connectedUser: string) => {
  //<< Get Rooms
  // const rooms = (await chatService.getRooms()).map((room: Room) => room.ID)

  // //# Create General Room if it doesn't exist
  // if(!rooms.includes("general")){
  //   chatService.createRoom("general");
  // }

  // EventBus.action("roomCreatedMsg", {});

  EventBus.notify(
    EventBus.action('userJoinedRoom', { roomID: "general", username: connectedUser })
  ); //=> Notify the EventBus new user joined general
  EventBus.notify(
    EventBus.action('userConnected', { username: connectedUser })
  ); //=> Notify the EventBus new user connected
};

const handleJoinRoom = async (message: UserJoinRoomNotification, socket: WebSocket) => {
  const roomID = message.payload.roomID;
    const username = message.payload.username;

    const instructions = {
      action: "userJoinedRoom",
      payload: {
        roomID: roomID,
        username,
      }
    };
    socket.send(JSON.stringify(instructions)); //=>
}

const handleUserConnected = async (message: EvntBusAction, socket: WebSocket) => {
  if (message.type === "userConnected") {
    const instructions = { info: "userConnected", payload: message.payload.username };
    socket.send(JSON.stringify(instructions)); //=>
  }
}

const handleNewChat = async (message: NewChatMsg, socket: WebSocket) => {
    const instructions = {
      action: "newChat",
      payload: {
        newChat: message.payload.chat,
      }
    };

    socket.send(JSON.stringify(instructions)); //=>
}