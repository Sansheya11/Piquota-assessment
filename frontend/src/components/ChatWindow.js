import React, { useState, useRef, useEffect } from "react";
import { sendMessage } from "../api";

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { id: "system", sender: "assistant", text: "Hi — how can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { id: Date.now(), sender: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessage(trimmed);
      setMessages((m) => [
        ...m,
        { id: Date.now() + "-ai", sender: "assistant", text: reply }
      ]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        { id: Date.now() + "-err", sender: "assistant", text: "Sorry, I couldn't get a response. Try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Common style object
  const styles = {
    container: {
      width: 600,
      margin: "1.5rem auto",
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(135deg, #fdfbfb, #ebedee)"
    },
    header: {
      background: "linear-gradient(90deg, #4e54c8, #8f94fb)",
      color: "white",
      fontWeight: 600,
      padding: "1rem",
      textAlign: "center",
      fontSize: "1.2rem"
    },
    messages: {
      height: 420,
      overflowY: "auto",
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      background: "#f9f9f9"
    },
    message: (sender) => ({
      maxWidth: "80%",
      padding: "0.6rem 0.8rem",
      borderRadius: 12,
      wordBreak: "break-word",
      alignSelf: sender === "user" ? "flex-end" : "flex-start",
      background:
        sender === "user"
          ? "linear-gradient(135deg, #0b93f6, #1c7ed6)"
          : "linear-gradient(135deg, #e5e5ea, #d7d7e0)",
      color: sender === "user" ? "white" : "black"
    }),
    loading: {
      alignSelf: "flex-start",
      background: "linear-gradient(135deg, #e0e0e0, #cfcfcf)",
      color: "#555",
      fontStyle: "italic",
      padding: "0.6rem 0.8rem",
      borderRadius: 12
    },
    form: {
      display: "flex",
      gap: 8,
      padding: "0.75rem",
      borderTop: "1px solid #eee",
      background: "white"
    },
    input: {
      flex: 1,
      padding: "0.6rem 1rem",
      borderRadius: 8,
      border: "1px solid #ccc",
      outline: "none",
      fontSize: "1rem"
    },
    button: {
      padding: "0.6rem 1.2rem",
      borderRadius: 8,
      border: "none",
      background: "linear-gradient(90deg, #4e54c8, #8f94fb)",
      color: "white",
      fontWeight: 600,
      cursor: loading ? "not-allowed" : "pointer"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>PiQuota Chat Assessment</div>

      <div ref={listRef} style={styles.messages}>
        {messages.map((m) => (
          <div key={m.id} style={styles.message(m.sender)}>
            {m.text}
          </div>
        ))}

        {loading && <div style={styles.loading}>Thinking...</div>}
      </div>

      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
}
