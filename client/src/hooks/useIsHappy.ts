import {useContext} from "react";

import HappyContext from "../context/happycontext";

export default function useIsHappy() {
  const ctx = useContext(HappyContext);

  return {
    isHappy: ctx.isHappy,
    toggleHappiness: () => {
      ctx.changeMood(!ctx.isHappy);
    },
  };
}
