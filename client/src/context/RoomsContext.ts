import { createContext } from "react";

import { Room } from "../../../server/contract";

export type RoomsContextType = {
  selectedRoom: Room | null;
  allRooms: Room[];

  createRoom: (roomName: string) => Promise<Room>;
  loadRooms: () => Promise<void>;
  selectRoom: (room: Room) => void;

};

const RoomsContext = createContext<RoomsContextType>({} as any);

export default RoomsContext;
