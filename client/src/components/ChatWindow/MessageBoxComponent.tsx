import { useContext, useEffect, useState } from "react";
import useProfileContext from '../../hooks/useProfileContext';
import WebSocketContext from '../../context/WebSocketContext';

function MessageBoxComponent() {
  const [typedMessage, typingEvent] = useState("");
  const { username } = useProfileContext();
  const { webSocket, send } = useContext(WebSocketContext);

  useEffect(() => {
    if (!webSocket) return;
  }, [webSocket]);


  const submitMessage = (evnt: React.FormEvent) => {
    evnt.preventDefault();

    // Create the message object
    const message = {
      username: username,
      message: typedMessage,
    };

    if (WebSocket.OPEN) {
      // TODO: ADD Message by HTTPPost
      //Send the message with instructions
      fetch("http://localhost:7000/addMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error adding dummy message:", error);
      });
    } else {
      console.error("Failed to send message ");
    }
    typingEvent("");
  };

  return (
    <div className=" bg-secondary ">
      <form className="shadow-lg flex justify-between" onSubmit={submitMessage}>
        <input
          type="text"
          onChange={(event) => typingEvent(event.target.value)}
          value={typedMessage}
          placeholder="Type your message /"
          className="flex-grow m-3 pt-0 pl-2 pr-2 bg-slate-500 rounded-sm text-slate-300 shadow-slate-200 shadow-sm focus:outline-none"
        />
        <button className="bg-primary p-4">SEND</button>
      </form>
    </div>
  );
}

export default MessageBoxComponent;