import ConversationComponent from "./ConversationComponent";
import ChatHeaderComponent from "./HeaderComponent";
import MessageBoxComponent from "./MessageBoxComponent";

function ChatWindow() {
  return (
    <div className="flex flex-col flex-grow">
      <ChatHeaderComponent
        name="GROUP NAME"
        icon="https://cdn-icons-png.flaticon.com/512/681/681494.png"
      />
      <ConversationComponent />
      <MessageBoxComponent />
    </div>
  );
}

export default ChatWindow;
