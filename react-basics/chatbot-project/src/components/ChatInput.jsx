import { useState } from "react";
import { Chatbot } from "supersimpledev";
import Spinner from "../assets/loading-spinner.gif";
import "./ChatInput.css";
import dayjs from "dayjs";

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage() {
    // loading handling
    setInputText("");
    if (isLoading || isLoading === "") {
      return;
    }
    setIsLoading(true);

    // get user Input set into first obj, second obj is for robot
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ];

    setChatMessages(newChatMessages);

    setChatMessages([
      ...newChatMessages,
      {
        message: <img className="loading" src={Spinner} />,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    //get response for robot form server
    const response = await Chatbot.getResponseAsync(inputText);
    // if(response)
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ]);

    setIsLoading(false);
  }
  function clearMessage() {
    setChatMessages([]);
  }
  return (
    <>
      <p className="no-message-text">
        {chatMessages.length === 0 &&
          "Welcome to the chatbot project! Send a message using the textbox below.  "}
      </p>
      <div className="chat-input-container">
        <input
          placeholder="Sent a message to Chatbot"
          className="chat-input"
          autoFocus
          onChange={(event) => {
            setInputText(event.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
            if (e.key === "Escape") {
              setInputText("");
            }
          }}
          size="30"
          value={inputText}
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
        <button className="clear-button" onClick={clearMessage}>
          clear
        </button>
      </div>
    </>
  );
}
export default ChatInput;
