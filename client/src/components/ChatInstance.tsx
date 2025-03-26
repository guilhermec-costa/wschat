import React, { FormEvent } from "react";
import useSocketLogic from "../hooks/useSocketLogic";

export interface ChatInstanceProps {
  name: string;
  setSelectedChats: React.Dispatch<React.SetStateAction<HTMLInputElement>>;
}

export default function ChatInstance({
  name,
  setSelectedChats,
}: ChatInstanceProps) {
  const [serverMessages, setServerMessages] = React.useState<string[]>([]);
  const socketLogic = useSocketLogic({
    setServerMessages,
  });
  const currentMessageRef = React.useRef<HTMLInputElement>(null);
  const [checked, setChecked] = React.useState<boolean>(false);

  function sendMessage(e: FormEvent) {
    e.preventDefault();
    if (currentMessageRef.current) {
      socketLogic.socket.send(currentMessageRef.current?.value);
    }
  }

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
        Socket State: {socketLogic.isSocketActive ? "Active" : "Inactive"}
      </div>

      <form action="">
        <div className="mt-3 flex gap-2">
          <input
            ref={currentMessageRef}
            disabled={!socketLogic.isSocketActive}
            type="text"
            placeholder="Type a message..."
            className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              socketLogic.isSocketActive
                ? "cursor-pointer"
                : "cursor-not-allowed"
            }`}
          />
          <button
            type="submit"
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </form>

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
