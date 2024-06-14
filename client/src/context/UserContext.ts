import { createContext } from "react";

import { Room } from "../../../server/contract";

type UserContextType = {
  username: string;
  setUsername: (username: string) => void; // Setter

  roomName: string;
  setRoomName: (roomName: string) => void; // Setter

  rooms: Room[];
  setRooms: (rooms: Room[]) => void; // Setter
};

const UserContext = createContext<UserContextType>({} as any);

export default UserContext;
