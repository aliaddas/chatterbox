import { useContext, useEffect, useMemo, useState } from 'react';
import { Room } from '../../../server/contract';
import WebSocketContext from '../context/WebSocketContext';

export function useRoom(room: Room) {
  const [roomMessages, setRoomMessages] = useState<{ [key: string]: CombinedMessages[] }>({});
  const { webSocket } = useContext(WebSocketContext);

  const messages = useMemo(
    () => {
      console.log('messages for room', room.ID)
      return roomMessages[room.ID] || []
    },
    [roomMessages, room]
  )

  useEffect(() => {
    if (!room) {
      return;
    }

    const listener = (ev: MessageEvent<string>) => {
      const data = JSON.parse(ev.data);

      if (data.action !== 'newChat') {
        return;
      }

      console.log(data.payload)
      const newMessage = { ...data.payload.newChat, createdAt: new Date(data.payload.newChat.createdAt) };

      setRoomMessages(msgs => {
        // if (!msgs[room.ID]) {
        //   msgs[room.ID] = [];
        // }

        // // Add new message to the room
        // msgs[room.ID].push(newMessage);
        // return msgs

        return {
          ...msgs,
          [room.ID]: [
            ...(msgs[room.ID] || []),
            newMessage
          ]
        }
      });
    }

    webSocket?.addEventListener('message', listener)

    return () => {
      webSocket?.removeEventListener('message', listener)
    }
  }, [room])

  return { messages }
}

//

type CombinedMessages = ChatMessage | SystemMessage;

type ChatMessage = {
  ID: number;
  username: string;
  message: string;
  createdAt: Date;
};

type SystemMessage = {
  type: string
  payload: any
}