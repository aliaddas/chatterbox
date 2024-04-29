import { Server } from "https://deno.land/x/socket_io@0.1.1/mod.ts";
import * as socketIo from "https://deno.land/x/socket_io@0.2.0/mod.ts";
import console from "node:console";

// Create websocket connection.
const socket = new WebSocket("ws://localhost:8080");

// Connection opened
socket.addEventListener("open", (event) => {
  socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});



export async function startSocketServer(port: number) {
  const io = new Server({
    cors: {
      origin: true,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log('new user on socket, id:' + socket.id);
    socket.on('disconnect', (reason) => {
      console.log('user disconnected, id: ' + socket.id);
    });

    socket.on('newMessage', (message:Chat) => {
      console.log('New Message:' + message);
      io.emit("emitAllMessage");
    });
  });

  console.log("WebSocket server running");
  // brokey ;(
  await io.listen(port);
}

type Chat = {
	id: string
	username: string
	message: string
	createdAt: Date
}