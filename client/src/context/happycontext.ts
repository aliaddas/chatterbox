import {createContext} from "react";

type HappyContext = {
  isHappy: boolean;

  changeMood: (newMood: boolean) => void;
};

const context = createContext<HappyContext>({} as any);

export default context;
