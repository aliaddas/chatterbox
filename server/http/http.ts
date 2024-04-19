import {Application} from "https://deno.land/x/oak@14.2.0/mod.ts";
import {oakCors} from "https://deno.land/x/cors/mod.ts";

import {messageRouter} from "./routes/messages.ts";
import {mathRouter} from "./routes/math.ts";

async function startHTTP(port: number) {
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

  app.use(mathRouter.routes());
  app.use(mathRouter.allowedMethods());

  console.log("Server running on port " + port);
  console.log(`HTTP server running. Access it at: http://localhost:${port}/`);

  await app.listen({port: port});
}

export default startHTTP;
