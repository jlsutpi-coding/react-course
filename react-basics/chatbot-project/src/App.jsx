import { useState } from "react";
import ChatInput from "./components/ChatInput";
import "./App.css";
import ChatMessages from "./components/ChatMessages";
import { useEffect } from "react";
import { Chatbot } from "supersimpledev";

function App() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem("chat-messages")) || []
  );

  useEffect(() => {
    Chatbot.addResponses({
      goodbye: "Goodbye. Have a great day!",
      "give me a unique id": function () {
        return ` Here is a unique ID: ${crypto.randomUUID()}`;
      },
      "fuck you": "fuck you too!",
    });
    // [] tells useEffect to only run once. We only want to run
    // this setup code once because we only want to add these
    // extra responses once.
  }, []);
  useEffect(() => {
    localStorage.setItem("chat-messages", JSON.stringify(chatMessages));
  }, [chatMessages]);
  return (
    <div className="app-container">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}
export default App;
