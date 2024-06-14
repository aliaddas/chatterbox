import startHTTP from "./http/http.ts";
import startWebSocket from "./http/websockets/websocket.ts";

startHTTP(7000);
startWebSocket(8000);
