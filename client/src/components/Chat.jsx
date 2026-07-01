import { useState, useEffect, useRef } from "react";
import socket from "../socket";
import Sidebar from "./Sidebar";
import Message from "./Message";
import "../App.css";
function Chat() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [users, setUsers] = useState([]);

  const [typing, setTyping] = useState("");

  const bottomRef = useRef();
  const typingTimeout = useRef(null);

  useEffect(() => {
    const receiveMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    const updateUsers = (usersList) => {
      console.log("Users:", usersList); // Debug
      setUsers(usersList);
    };

    const userTyping = (name) => {
      setTyping(`${name} is typing...`);
    };

    const stopTyping = () => {
      setTyping("");
    };

    socket.on("message", receiveMessage);
    socket.on("users", updateUsers); //  Missing in your code
    socket.on("typing", userTyping);
    socket.on("stopTyping", stopTyping);

    return () => {
      socket.off("message", receiveMessage);
      socket.off("users", updateUsers);
      socket.off("typing", userTyping);
      socket.off("stopTyping", stopTyping);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const joinChat = () => {
    if (!username.trim()) return;

    // Save username
    localStorage.setItem("username", username);

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", username, (response) => {
      if (!response.success) {
        localStorage.removeItem("username");
        alert(response.message);
        return;
      }

      setJoined(true);
    });
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", message);

    setMessage("");
  };

  const logout = () => {
    localStorage.removeItem("username");

    socket.disconnect();

    window.location.reload();
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);

    socket.emit("typing");

    clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit("stopTyping");
    }, 800);
  };

  if (!joined) {
    return (
      <div className="login">
        <h1>Realtime Chat</h1>

        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={joinChat}>Join Chat</button>
      </div>
    );
  }

  return (
    <div className="container">
      <Sidebar users={users} />

      <div className="chat">
        <div className="header">
          <h2>Realtime Chat</h2>

          <button className="logoutBtn" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <Message key={index} msg={msg} self={msg.user === username} />
          ))}

          <div ref={bottomRef}></div>
        </div>

        <small>{typing}</small>

        <div className="inputBox">
          <input
            value={message}
            onChange={handleTyping}
            placeholder="Type a message..."
          />

          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
