//>
//> Imports
//>

//> Services
import {roomService} from "../../services/roomservice.ts";

import {z} from "https://deno.land/x/zod@v3.22.4/mod.ts";
import {Router, RouterContext} from "https://deno.land/x/oak@14.2.0/mod.ts";

//> Routes
const roomRouter = new Router();

//> Zod Room Validator
const RoomValidator = z.object({
  name: z.string(),
});

roomRouter
  .post("/createRoom", handleCreateRoom)
  .get("/getRooms", handleGetRooms);


//#
//# Room Request Handlers
//#

//# Get Handler
function handleGetRooms(context: RouterContext<any, Record<string, any>>) {
  console.log("Get Rooms Handler");
  //? Response
  const { response } = context;

  //<< Get Rooms
  const rooms = roomService.getRooms();

  //=> Send Response to Client
  response.body = rooms;
}

//# Create Handler
async function handleCreateRoom(context: RouterContext<any, Record<string, any>>) {
  //? Request & Response
  const { request, response } = context;

  //? Get Request Body
  const rawRoomJSON = await request.body
  .json()
  .catch(() => new Error("Room is not in JSON format"));

  //* Parse & Validate
  const parsedRoomJSON = await RoomValidator.safeParseAsync(await rawRoomJSON.json);

  //! Parsing Failed
  if (!parsedRoomJSON.success) {
    //# Send Error to Client
    response.status = 422;
    response.body = parsedRoomJSON.error.message;
    return;
  }

  //? Extract Room Name
  const { name } = parsedRoomJSON.data;

  //# Create Room
  const newRoom = roomService.createRoom(name);

  //=> Send Response to Client
  response.body = newRoom;
}

export { roomRouter };