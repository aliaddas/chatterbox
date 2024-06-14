import {useContext} from "react";
import useProfileContext from "../../hooks/useUserContext";
import WebSocketContext from "../../context/WebSocketContext";
import useRoomsContext from "../../hooks/useRoomsContext";

function SideBarMenu() {
  const {username, submitUsername} = useProfileContext();
  const {webSocket} = useContext(WebSocketContext);
  const {allRooms} = useRoomsContext();
  const { selectedRoom } = useRoomsContext();
  const { createRoom, loadRooms, selectRoom } = useRoomsContext();

  const handleLogout = () => {
    webSocket?.close();
    submitUsername("");
  };

  const handleCreateRoom = () => {
    const name = prompt("Enter Room Name");
    createRoom(name!)
      .then(async (newRoom) => {
        console.log(newRoom)
        await loadRooms()

        return newRoom
      })
      .then((newRoom) => {
        console.log(newRoom)
        selectRoom(newRoom)
      });
    console.log({name});
  };

  return (
    <div className="flex flex-col min-w-[13%] bg-[rgb(24,14,24)] border-gray-500 border-r-2 rounded-tr-xl rounded-br-xl shadow-2xl shadow-[#5f455dc8]">
      <div className="w-full h-16 bg-[rgb(30,19,33)] rounded-tr-xl text-white text-3xl font-bold flex items-center justify-center">
        CHATTERBOX
      </div>
      <div className="h-1/4 glassmorphism rounded-xl m-4 p-2">
        <h1 className="text-center text-white font-bold">CONNECTED CLIENTS</h1>
        <p className="text-white">Userame: {username}</p>
      </div>
      <div className="min-h-1/3 glassmorphism rounded-xl m-4 p-2 flex flex-col justify-between">
        <div>
          <h1 className="text-center text-white font-bold">ROOMS</h1>
          {allRooms.map((room) => (
            <div className={`rounded-xl my-2 p-2 ${selectedRoom?.ID === room.ID ? "bg-green-500" : ""} cursor-pointer`} key={room.ID}>
              <div className='flex'>
              <p key={room.ID} className="text-white" data-x={room.ID}>
                {room.name}
              </p>
              <button className={`${selectedRoom?.ID === room.ID ? "hidden":""} ml-auto bg-[#4795d0] px-1 text-white rounded`} onClick={() => selectRoom(room)}>JOIN</button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleCreateRoom}
          className="w-full text-white bg-[#4795d0] rounded-lg border-2 border-blue-600"
        >
          New Room
        </button>
      </div>
      <div className="flex grow"></div>
      <div className="w-full p-4 h-16 bg-[rgb(30,19,33)] rounded-br-xl">
        <button
          onClick={handleLogout}
          className="h-full w-full text-white bg-[#d04752] rounded-lg border-2 border-red-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBarMenu;
