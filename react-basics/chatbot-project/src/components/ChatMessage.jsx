import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/profile-1.jpg";
// import { dayjs } from "dayjs";
import "./ChatMessage.css";
import dayjs from "dayjs";

function ChatMessage({ chatMessage }) {
  const { sender, message, time } = chatMessage;
  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img
          className="chat-message-profile"
          src={RobotProfileImage}
          alt="robot-photo"
        />
      )}
      <div className="chat-message-text">
        {message}
        <div className="chat-message-time">
          {time && dayjs(time).format("h:mma")}
        </div>
      </div>
      {sender === "user" && (
        <img
          className="chat-message-profile"
          src={UserProfileImage}
          alt="user-photo"
        />
      )}
    </div>
  );
}

export default ChatMessage;
