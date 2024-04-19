import {useEffect, useState} from "react";
import useIsHappy from "../../hooks/useIsHappy";

function SideBarMenu() {
  const happinness = useIsHappy();

  return (
    <div className="flex flex-col w-1/6 bg-primary">
      <div className="w-full h-20 bg-slate-200"></div>
      <div className="w-full flex-grow bg-slate-400">
        <h1 className="text-center">CHATS</h1>

        {happinness.isHappy ? "YEEEY" : "Oh nooo"}
        <br />

        <button onClick={happinness.toggleHappinness}>Toggle my mood</button>
      </div>
      <div className="w-full h-40 bg-slate-200"></div>
    </div>
  );
}

export default SideBarMenu;
