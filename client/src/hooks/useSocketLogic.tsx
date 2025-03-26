import React from "react";

export default function useSocketLogic({
  setServerMessages,
}: {
  setServerMessages: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [isSocketActive, setIsSocketActive] = React.useState<boolean>(false);

  const socket = React.useMemo(() => {
    const socket = new WebSocket("ws://localhost:8085");
    setIsSocketActive(true);
    return socket;
  }, []);

  socket.onopen = function (e) {
    console.log("Socket open");
  };

  socket.onmessage = (event) => {
    if (event.data === "__END__") return;
    setServerMessages((prev) => {
      const lastMessage = prev[prev.length - 1];
      return [...prev.slice(0, -1), lastMessage + event.data];
    });
  };

  socket.onclose = function (e) {
    setIsSocketActive(false);
  };

  return {
    setIsSocketActive,
    isSocketActive,
    socket,
  };
}
