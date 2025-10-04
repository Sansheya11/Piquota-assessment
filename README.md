# PiQuota Assessment - Chat Application

This project is a **ChatGPT-style web application** built using **React** (frontend) and **Node.js/Express** (backend).  
The backend provides a **mock AI chat service** simulating ChatGPT responses, which allows development without using paid APIs.

---

## Features

- Chat interface with user and assistant messages.
- Real-time message display in a chat-like UI.
- Mock ChatGPT-style responses for development.
- Input validation and error handling.
- Auto-scrolling chat window for better user experience.

---

## Project Structure

### Backend (Node.js/Express)


- **Mock mode** is enabled via `USE_MOCK=true` in `.env`.
- Returns preset ChatGPT-style responses based on user input (greetings, short questions, weather queries, etc.).

### Frontend (React)


- Users can type messages and receive responses from the backend.
- Chat messages are styled differently for user vs assistant.
- Auto-scrolls to show the latest messages.

---

## Setup Instructions

1. **Clone the repository:**

```bash
git clone <your-repo-url>
cd piquota-assessment

2.Backend run
cd backend
npm install

Create a .env file:

PORT=4000
USE_MOCK=true

Run command 
node server.js

Backend will run at: http://localhost:4000

Frontend setup:

cd ../frontend
npm install
npm start


Frontend will run at: http://localhost:3000

