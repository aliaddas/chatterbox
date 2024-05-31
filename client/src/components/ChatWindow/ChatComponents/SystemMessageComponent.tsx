import { MessageCircleWarning, UserRoundMinus, UserRoundPlus } from 'lucide-react';
import { join } from 'path';
import { useState } from 'react';

type SystemMessageProps = {
  key: string;
  type: string;
  message: string;
};

function SystemMessage({ key, type, message }: SystemMessageProps) {
  let username = ""

  const joinsentences = [
    "has joined the chat",
    "just slid into the room",
    "has popped into existence",
    "just teleported in",
    "just arrived, party can start"
  ];

  const leavesentences = [
    "has left the chat",
    "just vanished",
    "has left the building",
    "just disappeared",
    "just left, party is over"
  ];

  const [randomjoinSentence] = useState(joinsentences[Math.floor(Math.random() * joinsentences.length)]);
  const [randomleaveSentence] = useState(leavesentences[Math.floor(Math.random() * leavesentences.length)]);

  if(type === "userJoined") {
    username = message
    return (
      <h2 className='italic glassmorphism text-pink-500 ml-auto mr-auto p-2 mt-4 flex min-w-min max-w-max rounded-sm'>
        <MessageCircleWarning size={24} className={"italic mr-2"}/>
        {"Welcome to the chat"}<strong className={"ml-1"}>{username}</strong>{", keep it clean!"}
      </h2>
    );
  }

  if(type === "userConnected") {
    username = message
    return (
      <h2 className='italic text-emerald-600 ml-auto mr-auto p-2 mt-5 flex min-w-min max-w-max'>
        <UserRoundPlus size={22} className={"italic mr-2"}/>
        <strong className={"mr-1"}>{username}</strong>{randomjoinSentence}
      </h2>
    );
  }

  if(key === "userDisconnected") {
    username = message
    return (
      <h2 className='italic text-red-800 p-2 flex'>
        <UserRoundMinus size={22} className={"italic mr-2"}/>
        <strong className={"mr-1"}>{username}</strong>{randomleaveSentence}
      </h2>
    );
  }
}

export default SystemMessage;