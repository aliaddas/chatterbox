// TIP: maybe at first, don't worry about database &
// data persistance, but store everything in a local variable ?

import {Chat, IChatService} from "../contract.ts";
import EventBus from '../bus/eventbus.ts'

let id = 0;
const messageList: Chat[] = [
  {
    id: String(++id),
    username: "Ali",
    message: "Hello There",
    createdAt: new Date(),
  },
];

export const chatService: IChatService = {
  async addMessage(options) {
    const newChat: Chat = {
      id: String(++id),
      username: options.username,
      message: options.message,
      createdAt: new Date(),
    };

    messageList.push(newChat);

    EventBus.send({
      date: new Date(),
      payload: {
        chatId: newChat.id
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

  async getById(options){
    for (let i = 0; i < messageList.length; i++) {
      const message = messageList[i];
      if (message.id === options.id)
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
