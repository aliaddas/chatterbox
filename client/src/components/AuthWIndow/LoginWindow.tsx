// LoginWindow.tsx
import React, { useContext, useState } from "react";
import useUserContext from '../../hooks/useUserContext';
import WebSocketContext from '../../context/WebSocketContext';

function LoginWindow() {
  const [inputUsername, setInputUsername] = useState("");
  const { submitUsername } = useUserContext();
  const { webSocket, setWebSocket } = useContext(WebSocketContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitUsername(inputUsername);
    // Wait 500ms before creating the WebSocket
    const socketDelay = setTimeout(() => {
      const instanceWS = new WebSocket(`ws://localhost:8000?username=${inputUsername}`);

      instanceWS.onopen = () => {
        console.log('WebSocket connection opened (LoginWindow)');
        setWebSocket(instanceWS);
      }

      instanceWS.onclose = () => {
        console.log('WebSocket connection closed');
      }

      instanceWS.onerror = (event) => {
        console.error('WebSocket error', event);
      }
    }, 500);

    return () => {
      clearTimeout(socketDelay);
      if (webSocket && typeof webSocket !== 'function') {
        webSocket.close();
      }
    };
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-[rgb(12,5,16)]">
      <div className="bg-white p-8 rounded-md shadow-md">
        <form onSubmit={handleSubmit} className='space-x-10'>
          <input
            type="text"
            value={inputUsername}
            onChange={(event) => setInputUsername(event.target.value)}
            placeholder="Enter username"
            className="border border-gray-300 rounded-md p-2"
          />
          <button
            type="submit"
            className="bg-purple-950 text-white rounded-md px-4 py-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginWindow;
