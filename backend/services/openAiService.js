// backend/services/openAiService.js
import OpenAI from "openai";

let openai = null;

export const initOpenAI = () => {
  // if we're in mock mode, skip initializing the real client
  if (process.env.USE_MOCK === "true") {
    console.log("🟡 Mock mode enabled — not initializing OpenAI client");
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY missing in environment");
  }

  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  console.log("✅ OpenAI client initialized");
};

export const getChatResponse = async (userMessage) => {
  // Basic validation
  if (!userMessage || userMessage.trim() === "") {
    return "Please type something so I can help.";
  }

  // If mock mode is enabled, return a simulated ChatGPT-style reply
  if (process.env.USE_MOCK === "true") {
    // Simple templated mock — you can expand this to be fancier (randomness, contexts)
    const user = userMessage.trim();

    // A few heuristics to make the mock feel more natural
    if (/weather/i.test(user)) {
      return "I don't have live weather access here, but if you tell me your city I can give a sample forecast. For example: Today is sunny with a high of 27°C and a slight breeze.";
    }
    if (/hi|hello|hey/i.test(user)) {
      return "Hello! How can I help you today?";
    }
    if (user.endsWith("?") && user.split(" ").length < 10) {
      // short question -> concise reply
      return `Good question — here’s a concise answer to "${user}":\n\n(Example reply) This would be the core explanation you'd expect from ChatGPT.`;
    }

    // default mock reply (conversational + a slight personalized touch)
    return `Here's a helpful reply to your message: "${user}". (This is a mock response for local development.)`;
  }

  // Real OpenAI flow (only runs when USE_MOCK !== "true")
  if (!openai) throw new Error("OpenAI client not initialized. Call initOpenAI first.");

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion?.choices?.[0]?.message?.content;
    return reply || "Sorry, I couldn't generate a response.";
  } catch (err) {
    console.error("OpenAI API error:", err);
    throw err;
  }
};
