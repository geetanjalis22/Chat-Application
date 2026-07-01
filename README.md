# Real-Time Chat Application

A responsive real-time chat application built with **React**, **Node.js**, **Express**, and **Socket.IO**. The application enables users to register, log in, view online users, exchange messages instantly, see typing indicators, and communicate seamlessly in real time.

---

## Overview

This project demonstrates how to build a full-stack real-time chat application using WebSockets. It features a clean and responsive user interface with instant communication between multiple users.

The application includes a simple authentication system where users can register and log in before joining the chat room. Socket.IO is used to establish persistent bidirectional communication between the client and server, enabling instant message delivery.

---

## Features

- User Registration
- User Login
- Logout Functionality
- Real-Time Messaging
- Online Users List
- Join & Leave Notifications
- Message Timestamps
- Responsive Design
- Duplicate Username Prevention
- Clean and Professional UI
- Multi-user Chat Support
- Automatic Scroll to Latest Message

---

## Tech Stack

### Frontend

- React
- JavaScript (ES6+)
- CSS3
- Socket.IO Client

### Backend

- Node.js
- Express.js
- Socket.IO
- CORS

---

## Project Structure

```
Chat-Application/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.jsx
│   │   │   ├── Chat.jsx
│   │   │   ├── Message.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── socket.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   │
│   └── package.json
│
├── server/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/geetanjalis22/Chat-Application.git
```

```bash
cd Chat-Application
```

---

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

---

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

---

## Running the Application

### Start Backend

```bash
cd server
npm start
```

or

```bash
node server.js
```

Backend runs on

```
http://localhost:5000
```

---

### Start Frontend

Open another terminal.

```bash
cd client
npm start
```

Frontend runs on

```
http://localhost:3000
```

---

## Usage

1. Register a new account.
2. Login using your credentials.
3. Join the chat room.
4. Send messages in real time.
5. View online users.
6. Logout when finished.

---

##  Future Improvements

- Private Messaging
- Chat Rooms
- Message Persistence using MongoDB
- JWT Authentication
- Password Hashing with bcrypt
- Emoji Picker
- File Sharing
- Image Sharing
- Voice Messages
- Read Receipts
- Dark Mode
- User Profile Pictures
- Notifications
- Search Messages

---

## Concepts Used

- React Hooks
- Component-Based Architecture
- Express Server
- Socket.IO Events
- Event-Driven Programming
- Real-Time Communication
- State Management
- Responsive Web Design

---

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new feature branch.

```bash
git checkout -b feature-name
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push to your branch.

```bash
git push origin feature-name
```

5. Open a Pull Request.

---

## Support

If you found this project helpful, consider giving it a star on GitHub.

---

## License

This project is licensed under the MIT License.

Feel free to use, modify, and distribute it for learning and educational purposes.
