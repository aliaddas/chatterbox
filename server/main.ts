import startHTTP from "./http/http.ts";
import { startSocketServer } from "./websocket/websocket.ts";

const PORT = 8080;
await startSocketServer(PORT);
startHTTP(8000);
