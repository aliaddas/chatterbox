import ChatBubbleComponent from "./ChatBubble/ChatBubbleComponent";

function ConversationComponent() {
  return (
    <div className="flex flex-grow bg-secondary">
      <div className="w-20"></div>
      <div className="flex-grow h-full">
        <ChatBubbleComponent
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus, molestiae quam? Necessitatibus sapiente eos quos
            reprehenderit dolorum similique vitae possimus aliquid natus? Magnam
            consectetur repellat qui mollitia aut, ex delectus?"
          date="March 28   1:48PM"
        />
      </div>
      <div className="w-20"></div>
    </div>
  );
}

export default ConversationComponent;
