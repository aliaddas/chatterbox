import { useState } from "react";
import useProfileContext from '../../hooks/useProfileContext';
import { Plus } from 'lucide-react';


function MessageBoxComponent() {
  const [typedMessage, typingEvent] = useState("");
  const { username } = useProfileContext();

  const submitMessage = (evnt: React.FormEvent) => {
    evnt.preventDefault();

    // Create the message object
    const message = {
      username: username,
      message: typedMessage,
    };

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
    typingEvent("");
  };

  return (
    <div className=" glassmorphism mr-7 ml-7 rounded-lg mb-5">
      <form className="shadow-lg flex justify-between" onSubmit={submitMessage}>
        <button className='bg-[#6a6b71b5] m-3 mr-1 rounded-lg h-9 w-9 flex justify-center items-center'>
          <Plus className='text-white' />
        </button>
        <input
          type="text"
          onChange={(event) => typingEvent(event.target.value)}
          value={typedMessage}
          placeholder="Type your message /"
          className="flex-grow m-3 ml-1 pt-0 pl-2 pr-2 bg-[#6a6b71b5] rounded-lg text-slate-100 focus:outline-none"
        />
        <button className="bg-[#6a6b71b5] text-slate-100 rounded-tr-lg rounded-br-lg p-4">SEND</button>
      </form>
    </div>
  );
}

export default MessageBoxComponent;