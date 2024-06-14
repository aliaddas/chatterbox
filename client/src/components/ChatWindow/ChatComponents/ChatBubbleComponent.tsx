import useProfileContext from '../../../hooks/useUserContext';
import "./css/ChatBubbleComponent.css";



type Props = {
  message: ChatMessage;
};

const formatDate = (createdAt: Date) => {
  const date = new Date(createdAt);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

function ChatBubbleComponent({message}: Props) {
  const { username } = useProfileContext();
  const parsedDate = formatDate(message.createdAt);

  if(message.username === username) {
    return (
      <div className="glassmorphism min-w-3/5 w-6/12 h-min mt-5 p-3 rounded-md shadow-lg ml-auto">
        <h2 className="flex justify-between text-gray-300">
          <strong>{message.username}</strong>
        </h2>
        <p className='text-gray-300'>{message.message}</p>
        <em className="text-xs text-gray-400">{parsedDate}</em>
      </div>
    )
  }
  else{
    return (
      <div className="glassmorphism min-w-3/5 w-6/12 h-min mt-5 p-3 rounded-md shadow-lg">
        <h2 className="flex justify-between text-gray-300">
          <strong>{message.username}</strong>
        </h2>
        <p className='text-gray-300'>{message.message}</p>
        <em className="text-xs text-gray-400">{parsedDate}</em>
      </div>
    )
  }
}
export default ChatBubbleComponent;

type ChatMessage = {
  username: string;
  message: string;
  createdAt: Date;
};
