import React, { useState } from "react";


interface Props {
  socket: WebSocket | null;
}


function MessageBoxComponent({ socket }: Props) {
  const [input, setInput] = useState("");

  //Check if websocket exists
  if (!input.trim() || !socket) return;

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!input.trim()) return;

    // Send message on websocket
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          event: "send-message",
          message: input,
        })
      );

    setInput("")
  } else {
      console.error("WebSocket connection is not open");
    }
  };

  return (
    <div className="bg-secondary">
      <form className="shadow-lg flex justify-between" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Type your message"
          className="flex-grow m-3 pt-0 pl-2 pr-2 bg-slate-500 rounded-sm text-slate-300 shadow-slate-200 shadow-sm focus:outline-none"
        />
        <button type="submit" className="bg-primary p-4">
          SEND
        </button>
      </form>
    </div>
  );
}

export default MessageBoxComponent;
