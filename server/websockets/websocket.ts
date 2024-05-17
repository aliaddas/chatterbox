import EventBus from '../bus/eventbus.ts';
import { chatService } from '../services/chatservice.ts';
import { Disposable } from '../contract.ts'
import console from 'node:console';

export default function startWebSocket(port: number) {
  const connectedUsers: string[] = [];
  console.log(`Server: WebSocket Running... [${port}]`);

  Deno.serve((req) => {

    const connectedUser = new URL(req.url).searchParams.get("username");

    // Websocket not avialable
    if (req.headers.get("upgrade") != "websocket") {
      return new Response(null, { status: 501 });
    }

    // User not defined
    if (!connectedUser) {
      return new Response(null, { status: 400 });
    }

    // Upgrade request to WebSocket
    if(connectedUsers.includes(connectedUser)) {
      return new Response(null, { status: 400 })
    }

    const { socket, response } = Deno.upgradeWebSocket(req);
    let disposable: Disposable | null = null

  socket.addEventListener("open", async () => {
    console.log(`${connectedUser} joined the chat!`);

    connectedUsers.push(connectedUser);
    EventBus.send({
      type: "userConnected",
      payload: {
        username: connectedUser,
      },
    });

    disposable = await EventBus.subscribe(
      {},
      async (message) => {
        console.log({ message })
        if (message.type === "newChat") {
          const newChat = await chatService.getById({ id: message.payload.chatId });
          const instructions = { action: "newChat", payload: newChat };
          socket.send(JSON.stringify(instructions));
        }

        if (message.type === "userConnected") {
          const instructions = { info: "userConnected", payload: message.payload.username };
          socket.send(JSON.stringify(instructions));
        }
      }
    );
  });

  socket.addEventListener("close", () => {
    disposable?.dispose()
    console.log(`${connectedUser} left the chat!`);
  });

  return response;
  });
}
