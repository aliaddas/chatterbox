import EventBus from '../bus/eventbus.ts';
import { chatService } from '../services/chatservice.ts';
import { Disposable } from '../contract.ts'

export default function startWebSocket(port: number) {
  console.log(`Server: WebSocket Running... [${port}]`);

  Deno.serve((req) => {
    if (req.headers.get("upgrade") != "websocket") {
      return new Response(null, { status: 501 });
    }

    const { socket, response } = Deno.upgradeWebSocket(req);
    let disposable: Disposable | null = null

    socket.addEventListener("open", async () => {
      console.log("[WS] A client connected!");

      disposable = await EventBus.subscribe(
        {},
        async (message) => {
          // TODO: Send new message to socket client

          // Get Message ID from massage handler callback.
          const newChat = await chatService.getById({id: message.payload.chatId})
          const instructions = { action: "newChat", payload: newChat}
          socket.send(JSON.stringify(instructions));
        }
      )
    });

    socket.addEventListener("close", () => {
      disposable?.dispose()
      console.log("[WS] A client disconnected");
    });

    // socket.addEventListener("message", async (event) => {
    //   const data = JSON.parse(event.data);
    //   //
    //   // ) Add messages request
    //   //
    //   if (data.action === "addMessage") {
    //     console.log('\x1b[36m%s\x1b[0m',"[REQ] Adding message request");
    //     console.log("    Action: " + data.action);
    //     console.log("    Contents: ");
    //     console.log(data.message);
    //     // Use Chat Service to add the message
    //     chatService.addMessage(data.message);
    //     data.info = "addMessageSuccess";
    //     socket.send(JSON.stringify(data));

    //   }
    //   //
    //   // ) Get messages request
    //   //
    //   else if (data.action === "getMessages") {
    //     console.log('\x1b[36m%s\x1b[0m',"[REQ] Get messages request");
    //     // Use Chat Service to get the messages object
    //     const messages = await chatService.getMessages({
    //       take: Number(data.take),
    //       skip: Number(data.skip),
    //     });
    //     socket.send(JSON.stringify({ info: "getMessagesSuccess", messages: messages }))
    //   }
    // });

    return response;
  });
}