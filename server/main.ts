import startHTTP from "./http/http.ts";
import startWebSocket from "./websockets/websocket.ts";

startHTTP(7000);
startWebSocket(8000);
