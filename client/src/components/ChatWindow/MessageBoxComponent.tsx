import { useState } from "react";
import useProfileContext from '../../hooks/useProfileContext';

function MessageBoxComponent() {
  const [input, setInput] = useState("");

  const { username } = useProfileContext();

  const eventToString = (evnt: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = evnt.target.value;
    setInput(newValue);

  };

  const submitMessage = (evnt: React.FormEvent) => {
    evnt.preventDefault();
    setInput("");

    const message = {
      username: username,
      message: input,
    };
    fetch("http://localhost:8000/addMessage", {
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
  };

  return (
    <div className=" bg-secondary ">
      <form className="shadow-lg flex justify-between" onSubmit={submitMessage}>
        <input
          type="text"
          onChange={eventToString}
          value={input}
          placeholder="Type your message /"
          className="flex-grow m-3 pt-0 pl-2 pr-2 bg-slate-500 rounded-sm text-slate-300 shadow-slate-200 shadow-sm focus:outline-none"
        />
        <button className="bg-primary p-4">SEND</button>
      </form>
    </div>
  );
}

export default MessageBoxComponent;
