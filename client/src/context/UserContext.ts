import { createContext } from "react";

type UserContextType = {
  username: string;
  setUsername: (username: string) => void; // Setter
};

const UserContext = createContext<UserContextType>({} as any);

export default UserContext;
