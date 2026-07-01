import { useState } from "react";
import socket from "../socket";
import "../App.css";
function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const submit = () => {
    setError("");
    if (!socket.connected) {
      socket.connect();
    }

    const event = isLogin ? "login" : "register";

    socket.emit(
      event,
      {
        username,
        password,
      },
      (response) => {
        if (!response.success) {
          setError(response.message);
          return;
        }

        if (isLogin) {
          localStorage.setItem("username", username);

          onLogin(username);
        } else {
          alert("Registration successful. Please login.");

          setIsLogin(true);
        }
      },
    );
  };

  return (
    <div className="login">
      <div className="login-card">
        <h1>{isLogin ? "Login" : "Register"}</h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button onClick={submit}>{isLogin ? "Login" : "Register"}</button>

        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{
              color: "blue",
              cursor: "pointer",
              marginLeft: 5,
            }}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
