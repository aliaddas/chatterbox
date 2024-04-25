// App.tsx
import React, { useState } from "react";
import "./App.css";
import ChatWindow from "./components/ChatWindow";
import SideBarMenu from "./components/ChatWindow/SideBarMenu";
import ProfileContext from "./context/ProfileContext";
import LoginWindow from "./components/AuthWindow/LoginWindow";

function App() {
  const [username, setUsername] = useState(""); // Manage the state here

  return (
    <ProfileContext.Provider value={{ username, setUsername }}> {/* Pass the setUsername function from useState */}
      <div className="flex h-screen w-screen">
        {username === "" ? (
          <LoginWindow />
        ) : (
          <>
            <SideBarMenu />
            <ChatWindow />
          </>
        )}
      </div>
    </ProfileContext.Provider>
  );
}

export default App;