import { useContext } from 'react';
import useProfileContext from '../../hooks/useProfileContext';
import WebSocketContext from '../../context/WebSocketContext';



function SideBarMenu() {
  const { username, submitUsername } = useProfileContext();
  const { webSocket } = useContext(WebSocketContext);

  const handleLogout = () => {
    webSocket?.close();
    submitUsername("");
  }

  return (
    <div className="flex flex-col min-w-[13%] bg-[rgb(24,14,24)] border-gray-500 border-r-2 rounded-tr-xl rounded-br-xl shadow-2xl shadow-[#5f455dc8]">
      <div className="w-full h-16 bg-[rgb(30,19,33)] rounded-tr-xl text-white text-3xl font-bold flex items-center justify-center">
  CHATTERBOX
</div>
      <div className="h-1/4 glassmorphism rounded-xl m-4 p-2">
        <h1 className="text-center text-white font-bold">CONNECTED CLIENTS</h1>
        <p className='text-white'>Userame: {username}</p>
      </div>
      <div className='flex grow'>

      </div>
      <div className="w-full p-4 h-16 bg-[rgb(30,19,33)] rounded-br-xl">
        <button onClick={handleLogout} className='h-full w-full text-white bg-[#d04752] rounded-lg border-2 border-red-800'>Logout</button>
      </div>
    </div>
  );
}

export default SideBarMenu;
