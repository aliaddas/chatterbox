import { Room } from "../contract.ts";
import { v4 as uuidv4 } from '../node_modules/uuid/wrapper.mjs';


class RoomService {
  private roomList: Room[] = [];

  createRoom(name: string): Room {
    const room = { ID: uuidv4(), name }; // Add ID property
    this.roomList.push(room);
    return room;
  }

  getRooms(): Room[] {
    return this.roomList;
  }

  getRoomIDByName(roomName: string): Room | undefined {
    return this.roomList.find(room => room.name === roomName);
  }
}

export const roomService = new RoomService();