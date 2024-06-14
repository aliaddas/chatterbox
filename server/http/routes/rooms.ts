//>
//> Imports
//>

//> Services
import {chatService} from "../../services/chatservice.ts";

import {z} from "https://deno.land/x/zod@v3.22.4/mod.ts";
import {Router, RouterContext} from "https://deno.land/x/oak@14.2.0/mod.ts";

//> Routes
const roomRouter = new Router();

//> Zod Room Validator
const RoomValidator = z.object({
  roomName: z.string(),
});

roomRouter
  .post("/createRoom", handleCreateRoom)
  .get("/getRooms", handleGetRooms);


//#
//# Room Request Handlers
//#

//# Get Handler
async function handleGetRooms(context: RouterContext<any, Record<string, any>>) {
  console.log("Get Rooms Handler");
  //? Response
  const { response } = context;

  //<< Get Rooms
  const rooms = await chatService.getRooms();
  console.log('rooms', rooms);

  //=> Send Response to Client
  response.body = rooms;
}

//# Create Handler
async function handleCreateRoom(context: RouterContext<any, Record<string, any>>) {
  //? Request & Response
  const { request, response } = context;

  //? Get Request Body
  const body = await request.body
  .json()
  .catch(() => new Error("Room is not in JSON format"));

  console.log(body);
  // //* Parse & Validate
  const parsedRoomJSON = await RoomValidator.safeParseAsync(body);

  //! Parsing Failed
  if (!parsedRoomJSON.success) {
    //# Send Error to Client
    response.status = 422;
    response.body = parsedRoomJSON.error.message;
    return;
  }

  //? Extract Room Name
  const { roomName } = parsedRoomJSON.data;

  //# Create Room
  const newRoom = await chatService.createRoom(roomName);

  //=> Send Response to Client
  response.body = newRoom;
}

export { roomRouter };