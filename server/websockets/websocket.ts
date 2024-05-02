import { chatService } from "../services/chatservice.ts";

export default function startWebSocket(port: number) {
  console.log(`Server: WebSocket Running... [${port}]`);

  Deno.serve((req) => {
    if (req.headers.get("upgrade") != "websocket") {
      return new Response(null, { status: 501 });
    }
    const { socket, response } = Deno.upgradeWebSocket(req);
    socket.addEventListener("open", () => {
      console.log("[WS] A client connected!");
    });
    socket.addEventListener("close", () => {
      console.log("[WS] A client disconnected");
    });
    socket.addEventListener("message", async (event) => {
      const data = JSON.parse(event.data);
      //
      // ) Add messages request
      //
      if (data.action === "addMessage") {
        console.log('\x1b[36m%s\x1b[0m',"[REQ] Adding message request");
        console.log("    Action: " + data.action);
        console.log("    Contents: ");
        console.log(data.message);
        // Use Chat Service to add the message
        chatService.addMessage(data.message);
        data.info = "addMessageSuccess";
        socket.send(JSON.stringify(data));

      }
      //
      // ) Get messages request
      //
      else if (data.action === "getMessages") {
        console.log('\x1b[36m%s\x1b[0m',"[REQ] Get messages request");
        // Use Chat Service to get the messages object
        const messages = await chatService.getMessages({
          take: Number(data.take),
          skip: Number(data.skip),
        });
        socket.send(JSON.stringify({ info: "getMessagesSuccess", messages: messages }))
      }
    });
    return response;
  });
}