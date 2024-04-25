import { createContext } from "react";

type ProfileContextType = {
  username: string;
  setUsername: (username: string) => void; // Setter
};

const ProfileContext = createContext<ProfileContextType>({} as any);

export default ProfileContext;
