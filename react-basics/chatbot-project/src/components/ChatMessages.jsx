import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import "./CHatMessages.css";

// the same with calling the function chatInput();
function useAutoScroll(dependencies) {
  // It's highly recommend to rename this to something
  // more generic like containerRef. This will make the
  // code make more sense if we ever reuse this code in
  // other components.
  const containerRef = useRef(null);

  useEffect(() => {
    const containerElem = containerRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [dependencies]);

  return containerRef;
}
function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll(chatMessages);

  {
    return (
      <div className="chat-messages-container" ref={chatMessagesRef}>
        {chatMessages.map((chatMessage) => {
          return <ChatMessage key={chatMessage.id} chatMessage={chatMessage} />;
        })}
      </div>
    );
  }
}
export default ChatMessages;
