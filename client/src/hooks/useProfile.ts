import {useContext} from "react";

import ProfileContext from "../context/userProfileContext";

export default function useProfile() {
  const ctx = useContext(ProfileContext);

  return {
    username: ctx.username,
  };
}
