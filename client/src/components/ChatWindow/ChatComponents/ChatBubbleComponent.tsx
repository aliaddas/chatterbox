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
  const parsedDate = formatDate(message.createdAt);

  return (
    <div className="bg-slate-300 w-6/12 h-min m-5 p-3 rounded-md shadow-lg">
      <h2 className="flex justify-between">
        <strong>{message.username}</strong>
      </h2>
      <p>{message.message}</p>
      <em className="text-xs">{parsedDate}</em>
    </div>
  );
}

export default ChatBubbleComponent;

type ChatMessage = {
  username: string;
  message: string;
  createdAt: Date;
};
