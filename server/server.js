const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const registeredUsers = new Map();

const users = new Map();
io.on("connection", (socket) => {
  // Register
  socket.on("register", ({ username, password }, callback) => {
    console.log("Register Request:", username);

    username = username.trim();

    if (!username || !password) {
      callback({
        success: false,
        message: "Username and password are required.",
      });
      return;
    }

    if (registeredUsers.has(username)) {
      callback({
        success: false,
        message: "User already exists.",
      });
      return;
    }

    registeredUsers.set(username, password);

    callback({
      success: true,
      message: "Registration successful.",
    });
  });
  // Login
  socket.on("login", ({ username, password }, callback) => {
    if (!registeredUsers.has(username)) {
      callback({
        success: false,
        message: "User does not exist.",
      });
      return;
    }

    if (registeredUsers.get(username) !== password) {
      callback({
        success: false,
        message: "Incorrect password.",
      });
      return;
    }

    callback({
      success: true,
      message: "Login successful.",
    });
  });
  socket.on("join", (username, callback) => {
    username = username.trim();

    // Check empty username
    if (!username) {
      callback({
        success: false,
        message: "Username cannot be empty",
      });
      return;
    }

    // Check duplicate username
    const exists = Array.from(users.values()).includes(username);

    if (exists) {
      callback({
        success: false,
        message: "Username already taken",
      });
      return;
    }

    // Add user
    users.set(socket.id, username);

    // Send updated users list to everyone
    io.emit("users", Array.from(users.values()));

    // Notify other users
    socket.broadcast.emit("message", {
      user: "System",
      text: `${username} joined the chat`,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    callback({
      success: true,
    });
  });

  socket.on("sendMessage", (message) => {
    io.emit("message", {
      user: users.get(socket.id),
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  });
  socket.on("typing", () => {
    const username = users.get(socket.id);

    if (!username) return;

    socket.broadcast.emit("typing", username);
  });

  socket.on("stopTyping", () => {
    socket.broadcast.emit("stopTyping");
  });
  socket.on("disconnect", () => {
    const username = users.get(socket.id);

    users.delete(socket.id);

    io.emit("users", Array.from(users.values()));

    if (username) {
      socket.broadcast.emit("message", {
        user: "System",

        text: `${username} left the chat`,

        time: new Date().toLocaleTimeString(),
      });
    }
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
