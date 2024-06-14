import { Application } from "https://deno.land/x/oak@14.2.0/mod.ts";
import { messageRouter } from "./routes/messages.ts";
import { roomRouter } from "./routes/rooms.ts";

export default async function startHTTP(port: number) {
  const app = new Application();
  app.use((ctx, next) => {
    ctx.response.headers.set("Access-Control-Allow-Origin", "*");
    ctx.response.headers.set(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    return next();
  });
  app.use(messageRouter.routes());
  app.use(messageRouter.allowedMethods());

  app.use(roomRouter.routes());
  app.use(roomRouter.allowedMethods());

  console.log(`Server: HTTP      Running... [${port}]`);
  await app.listen({ port: port });
}