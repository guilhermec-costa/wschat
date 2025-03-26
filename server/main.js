const ws = require("ws");
const { v4: uuidV4 } = require("uuid");
const { OllamaClient } = require("./ollama-client");

const wsSocketServer = new ws.Server({
  port: 8085,
});

const client = new OllamaClient();

wsSocketServer.on("connection", (ws, req) => {
  console.log(`Socket connected at ${new Date().toString()}`);
  ws.on("message", async (data) => {
    const stringifiedMessage = data.toString();

    const response = await client.client.chat({
      model: "deepseek-r1:1.5b",
      messages: [{ role: "user", content: stringifiedMessage }],
    });
    for (const char of response.message.content) {
      if (ws.readyState === ws.OPEN) {
        ws.send(char);
        await new Promise((res) => setTimeout(res, 10)); // Simula digitação
      }
    }
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
