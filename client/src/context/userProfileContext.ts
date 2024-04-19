import {createContext} from "react";

type ProfileCtxValue = {
  username: string;
};

const context = createContext<ProfileCtxValue>({} as any);

export default context;
