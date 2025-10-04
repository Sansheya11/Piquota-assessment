// frontend/src/api.js
export const sendMessage = async (message) => {
  try {
    const response = await fetch("http://localhost:4000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    return data.reply; // Make sure you return the 'reply' field
  } catch (err) {
    console.error("API error:", err);
    return "Sorry, something went wrong.";
  }
};
