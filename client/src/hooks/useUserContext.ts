// useProfile.ts
import { useContext } from "react";
import UserContextType from "../context/UserContext";
import { Room } from "../../../server/contract";

export default function useUserContext() {
  const ctx = useContext(UserContextType);
  return {
    //? Username
    username: ctx.username,
    submitUsername: (username: string) => {
      ctx.setUsername(username)
    },

    //? Room ID
    roomName: ctx.roomName,
    setRoomName: (roomName: string) => {
      ctx.setRoomName(roomName)
    },

    //? Rooms
    rooms: ctx.rooms,
    setRooms: (rooms: Room[]) => {
      ctx.setRooms(rooms)
    }
  }
}