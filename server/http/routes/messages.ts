//>
//> Imports
//>

//> Services
import {chatService} from "../../services/chatservice.ts";
import {roomService} from "../../services/roomservice.ts";

import {z} from "https://deno.land/x/zod@v3.22.4/mod.ts";
import console from "node:console";
import {Router, RouterContext} from "https://deno.land/x/oak@14.2.0/mod.ts";

//> Routes
const messageRouter = new Router();

//> Zod (Query, Message, Room) Validators
const QueryValidator = z.object({
  take: z.coerce.number().optional(),
  skip: z.coerce.number().optional(),
});

const MessageValidator = z.object({
  username: z.string().min(1, {message: "Username Required"}),
  message: z.string().min(1, {message: "Message Required"}),
  roomName: z.string().min(1, {message: "Room Name Required"}),
});

//* Route Handlers
messageRouter
  .post("/addMessage", handleAddMessage)
  .get("/getMessages", handleGetMessages);

//#
//# Message Handlers
//#

//# Get Handler
async function handleGetMessages(
  context: RouterContext<any, Record<string, any>>
) {
  //? Request & Response
  const {request, response} = context;

  //* Parse & Validate Params
  const parsing = await QueryValidator.safeParseAsync({
    take: request.url.searchParams.get("take"),
    skip: request.url.searchParams.get("skip"),
  });

  if (!parsing.success) {
    //# Send Error to Client
    response.status = 422;
    response.body = parsing.error.message;
    return;
  }

  //? Query Params
  const {take, skip} = parsing.data;

  //<< Get Messages
  const messages = await chatService.getMessages({
    take: Number(take),
    skip: Number(skip),
  });

  //=> Send Response
  response.body = messages;
}

//# Add Handler
async function handleAddMessage(context: RouterContext<any, Record<string, any>>) {
  //? Request & Response
  const {response, request} = context;

  //? Get roomID from URL
  const roomName = request.url.searchParams.get("roomName");

  //! Handle null case
  if (roomName === null) {
    response.status = 422;
    response.body = "Room ID is missing";
    return;
  }

  //? Get Request Body
  const rawMessageJSON = await request.body
    .json()
    .catch(() => new Error("Message is not in JSON format"));

  if (rawMessageJSON instanceof Error) {
    response.body = rawMessageJSON.message;
    return;
  }
  console.log(`New message for Room: ${roomName}`);

  //* Parse & Validate Message
  const parsedMessageJSON = MessageValidator.safeParse(rawMessageJSON);

  //! Parsing Failed
  if (!parsedMessageJSON.success) {
    //# Send Error to Client
    response.status = 422;
    response.body = parsedMessageJSON.error.message;
    console.log(parsedMessageJSON.error.message)
    return;
  }

  //# Add Message
  const message = await chatService.addMessage(rawMessageJSON);



  //=> Send Response to Client
  response.body = {message};
}

export { messageRouter };