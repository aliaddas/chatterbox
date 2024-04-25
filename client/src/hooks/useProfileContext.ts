// useProfile.ts
import { useContext } from "react";
import ProfileContext from "../context/ProfileContext";

export default function useProfileContext() {
  const ctx = useContext(ProfileContext);
  return {
    username: ctx.username,
    submitUsername: (username: string) => {
      ctx.setUsername(username)
    }
  }
}