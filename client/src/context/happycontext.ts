import {createContext} from "react";

type HappyContextType = {
  isHappy: boolean;

  changeMood: (newMood: boolean) => void;
};

const HappyContext = createContext<HappyContextType>({} as any);

export default HappyContext;
