// LoginWindow.tsx
import React, { useState } from "react";
import useProfileContext from '../../hooks/useProfileContext';

function LoginWindow() {
  const [inputUsername, setInputUsername] = useState("");
  const { submitUsername } = useProfileContext();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitUsername(inputUsername);
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-slate-200">
      <div className="bg-white p-8 rounded-md shadow-md">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputUsername}
            onChange={(event) => setInputUsername(event.target.value)}
            placeholder="Enter username"
            className="border border-gray-300 rounded-md p-2 mb-2"
          />
          <button
            type="submit"
            className="bg-slate-500 text-white rounded-md px-4 py-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginWindow;
