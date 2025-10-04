import { getChatResponse } from "../services/openAiService.js";

export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const reply = await getChatResponse(message);
    res.json({ reply });
  } catch (err) {
    console.error("ChatController error:", err);
    res.status(500).json({ error: "Something went wrong while processing your request" });
  }
};
