import React, { FormEvent } from "react";
import ChatInstance, { ChatInstanceProps } from "./components/ChatInstance";

function App() {
  const [chats, setChats] = React.useState<ChatInstanceProps[]>([]);
  const [selectedChats, setSelectedChats] = React.useState([]);
  const newSocketNameRef = React.useRef<HTMLInputElement>(null);

  function registerNewSocket(event: FormEvent) {
    const socketName = newSocketNameRef.current?.value;
    if (!socketName) return;

    event.preventDefault();
    if (newSocketNameRef.current) {
      setChats((prev) => [...prev, { name: socketName }]);
      newSocketNameRef.current.value = "";
    }
  }

  function broadcast() {
    console.log(selectedChats);
  }

  return (
    <div className="">
      <div className="mx-auto w-[200px]">
        <form action="" onSubmit={registerNewSocket} className="py-10">
          <section className="flex gap-2">
            <input ref={newSocketNameRef} type="text" className="ring-1" />
            <button type="submit" className="bg-gray-300">
              add
            </button>
          </section>
        </form>
        <button type="button" className="bg-gray-300" onClick={broadcast}>
          brodcast selected channels
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {chats.map((chat, index) => (
          <div key={index}>
            <ChatInstance
              name={chat.name}
              setSelectedChats={setSelectedChats}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
