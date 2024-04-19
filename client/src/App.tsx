import React, {useState} from "react";
import "./App.css";
import ChatWindow from "./components/ChatWindow";
import SideBarMenu from "./components/ChatWindow/SideBarMenu";
import ProfileContext from "./context/userProfileContext";

function App() {
  const [username, setUsername] = useState("");

  return (
    <ProfileContext.Provider value={{username}}>
      <div className="flex h-screen w-screen">
        <SideBarMenu />
        <ChatWindow />
      </div>
    </ProfileContext.Provider>
  );
}

export default App;
