import { useState } from "react";
import Chat from "./components/Chat";
import Auth from "./components/Auth";
import "./App.css";
function App() {

  const [user, setUser] = useState(
    localStorage.getItem("username")
  );

  return user ? (
    <Chat username={user} />
  ) : (
    <Auth onLogin={setUser} />
  );

}

export default App;