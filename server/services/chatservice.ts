// TIP: maybe at first, don't worry about database &
// data persistance, but store everything in a local variable ?

import {Chat, IChatService} from "../contract.ts";
import EventBus from '../bus/eventbus.ts'

let ID = 0;
const messageList: Chat[] = [];

export const chatService: IChatService = {
  async addMessage(options) {
    const newChat: Chat = {
      ID: String(++ID),
      username: options.username,
      message: options.message,
      roomName: options.roomName,
      createdAt: new Date(),
    };

    messageList.push(newChat);

    EventBus.notify({
      type: 'newChat',
      date: new Date(),
      payload: {
        chatID: newChat.ID,
        roomName: newChat.roomName
      }
    })

    return newChat;
  },

  async getMessages(options) {
    const sortedList = messageList.sort(
      options.order === "asc" ? orderByAsc : orderByDesc
    );
    return sortedList.slice(options.skip, options.take);
  },

  async getByID(options){
    for (let i = 0; i < messageList.length; i++) {
      const message = messageList[i];
      if (message.ID === options.ID)
      return message;
    }
  }
};

// --
// Internal
// --

const orderByAsc = (a: Chat, b: Chat) => {
  if (a.createdAt < b.createdAt) {
    return 1;
  }

  return -1;
};

const orderByDesc = (a: Chat, b: Chat) => {
  if (a.createdAt < b.createdAt) {
    return -1;
  }

  return 1;
};
