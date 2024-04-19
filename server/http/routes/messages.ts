import {Router, RouterContext} from "https://deno.land/x/oak@14.2.0/mod.ts";
import {chatService} from "../../services/chatservice.ts";
import {z} from "https://deno.land/x/zod@v3.22.4/mod.ts";

const messageRouter = new Router();

const QueryValidator = z.object({
  take: z.coerce.number().optional(),
  skip: z.coerce.number().optional(),
});

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
  const {request, response} = context;

  const parsing = await QueryValidator.safeParseAsync({
    take: request.url.searchParams.get("take"),
    skip: request.url.searchParams.get("skip"),
  });

  if (!parsing.success) {
    response.status = 422;
    response.body = parsing.error.message;
    return;
  }

  const {take, skip} = parsing.data;

  const messages = await chatService.getMessages({
    take: Number(take),
    skip: Number(skip),
  });

  response.body = messages;
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
