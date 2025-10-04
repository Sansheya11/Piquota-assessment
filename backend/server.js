// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";
import { initOpenAI } from "./services/openAiService.js";

// Load .env
dotenv.config();

// Initialize OpenAI (or mock)
try {
  initOpenAI();
} catch (err) {
  console.error("Failed to init OpenAI:", err.message);
  process.exit(1); // stop if real OpenAI initialization fails
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/chat", chatRoutes);

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
