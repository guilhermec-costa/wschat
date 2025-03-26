const ollama = require("ollama");

class OllamaClient {
  /**
   * @type {ollama.Ollama}
   */
  client;
  constructor() {
    this.client = new ollama.Ollama({
      host: "http://127.0.0.1:11434",
    });
    console.log("connected to client");
  }

  /**
   *
   * @param {string} question
   */
  async chat(question) {
    try {
      const chatResponse = await this.client.chat({
        model: "deepseek-r1:8b",
        messages: [{ role: "user", content: question }],
      });

      const content = chatResponse.message.content;
      const withoutThinking = this.excludeThinking(content);
      return withoutThinking;
    } catch (error) {
      return "Failed to chat";
    }
  }

  /**
   *
   * @param {string} content
   * @returns {string} content without think explanation
   */
  excludeThinking(content) {
    const responseStartIdx = content.indexOf("</think>") + 10;
    return content.substring(responseStartIdx);
  }
}

module.exports = {
  OllamaClient,
};
