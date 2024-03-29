import {Router, RouterContext} from "https://deno.land/x/oak@14.2.0/mod.ts";
import {chatService} from "../../services/chatservice.ts";
import {z} from "https://deno.land/x/zod@v3.22.4/mod.ts";

const messageRouter = new Router();

const MessageValidator = z.object({
  username: z.string(),
  message: z.string().min(1, {message: "Required"}),
});

messageRouter
  .post("/addMessage", handleAddMessage)

  .get("/getMessage", handleGetMessage);

async function handleGetMessage(
  context: RouterContext<any, Record<string, any>>
) {
  const message = await chatService.getMessages({take: 1, skip: 1});

  context.response.body = message;
}
export {messageRouter};

/// INTERNAL
async function handleAddMessage(
  context: RouterContext<any, Record<string, any>>
) {
  const myBody = await context.request.body
    .json()
    .catch(() => new Error("Invalid JSON"));

  if (myBody instanceof Error) {
    context.response.body = myBody.message;
    return;
  }

  const parsedBody = MessageValidator.safeParse(myBody);

  if (!parsedBody.success) {
    context.response.body = parsedBody.error.message;
    return;
  }

  const message = await chatService.addMessage(myBody);
  context.response.body = {message};
}
