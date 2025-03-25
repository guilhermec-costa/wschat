const ws = require("ws");
const { v4: uuidV4 } = require("uuid");

const wsSocketServer = new ws.Server({
  port: 8085,
});

const socketsMap = {};

/**
 *
 * @param {ws.WebSocket} socket
 * @returns {string} id - id of the created socket
 */
function registerSocket(socket) {
  const socketId = uuidV4();
  socketsMap[socketId] = socket;
  return socketId;
}

wsSocketServer.on("open", () => {
  console.log("Connected to server");
});

wsSocketServer.on("connection", (ws, req) => {
  console.log(`Socket connected at ${new Date().toString()}`);
  const sId = registerSocket(ws);
  ws.send(`Comunication Socket created: Id: ${sId}`);

  ws.on("message", (data) => {
    const stringifiedData = data.toString();
    const clientWsId = stringifiedData.substring(
      stringifiedData.lastIndexOf("\n") + 1
    );
    ws.send(`SocketId: ${clientWsId}`);
  });

  setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.ping();
    }
  }, 5000);

  ws.on("close", () => {
    console.log("Socket closed");
  });
});
