import "./App.css";
import ChatWindow from "./components/ChatWindow";
import SideBarMenu from "./components/SideBarMenu";

function App() {
  return (
    <div className="flex h-screen w-screen">
      <SideBarMenu />
      <ChatWindow />
    </div>
  );
}

export default App;
