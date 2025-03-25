import React from "react";
import ChatInstance, { ChatInstanceProps } from "./components/ChatInstance";
import "./App.css";

function App() {
  const [chats, setChats] = React.useState<ChatInstanceProps[]>([]);
  const newSocketNameRef = React.useRef<HTMLInputElement>(null);

  function registerNewSocket() {
    setChats((prev) => [...prev, { name: newSocketNameRef.current.value }]);
  }

  React.useEffect(() => {
    if (newSocketNameRef.current) {
      newSocketNameRef.current.value = "";
    }
  }, [chats]);

  return (
    <div>
      <div>
        <input ref={newSocketNameRef} type="text" />
        <button onClick={registerNewSocket}>add</button>
      </div>
      <div>
        {chats.map((chat, index) => (
          <div key={index}>
            <ChatInstance name={chat.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
