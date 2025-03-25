import React from "react";

export interface ChatInstanceProps {
  name: string;
  setSelectedChats: React.Dispatch<React.SetStateAction<never[]>>;
}

export default function ChatInstance({
  name,
  setSelectedChats,
}: ChatInstanceProps) {
  const currentMessageRef = React.useRef<HTMLInputElement>(null);
  const [checked, setChecked] = React.useState<boolean>(false);
  const socket = React.useMemo(() => {
    return new WebSocket("ws://localhost:8085");
  }, []);

  const [serverMessages, setServerMessages] = React.useState<string[]>([]);

  function sendMessage() {
    if (currentMessageRef.current) {
      socket.send(currentMessageRef.current?.value);
    }
  }
  socket.onopen = function (e) {
    console.log("Socket open");
  };

  socket.onmessage = function (e) {
    setServerMessages((prev) => [...prev, e.data]);
  };

  function handleChatSelection() {
    setChecked((prev) => {
      setSelectedChats((prev) => [...prev, "ackshually"]);
      return !prev;
    });
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-md mx-auto border border-gray-200">
      <div className="flex items-center gap-2">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <input
          id="selected"
          checked={checked}
          type="checkbox"
          onChange={handleChatSelection}
        />
      </div>

      <div className="mt-3 flex gap-2">
        <input
          ref={currentMessageRef}
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>

      <h3 className="mt-4 font-bold text-gray-700">Server messages</h3>
      <div className="mt-2 space-y-1 max-h-40 overflow-y-auto">
        {serverMessages.map((msg, index) => (
          <p
            key={index}
            className="bg-gray-100 px-3 py-1 rounded-lg text-gray-700"
          >
            {msg}
          </p>
        ))}
      </div>
    </div>
  );
}
