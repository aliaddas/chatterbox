import ChatBubbleComponent from "./ChatBubble/ChatBubbleComponent";

function ConversationComponent() {
  return (
    <div className="flex flex-grow bg-secondary">
      <div className="w-20"></div>
      <div className="flex-grow h-full">
        <ChatBubbleComponent />
        <ChatBubbleComponent />
        <div className="bg-slate-300 w-7/12 h-min m-0 ml-auto mr-5 p-3 rounded-md">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus, molestiae quam? Necessitatibus sapiente eos quos
            reprehenderit dolorum similique vitae possimus aliquid natus? Magnam
            consectetur repellat qui mollitia aut, ex delectus?
          </p>
        </div>
      </div>
      <div className="w-20"></div>
    </div>
  );
}

export default ConversationComponent;
