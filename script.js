const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const footerClock = document.getElementById("footerClock");

// Initialize
addJarvisMessage(
  "Systems booted successfully. I'm online and ready, Aashu."
);
updateClock();
setInterval(updateClock, 1000);

// Handle form submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;

  addUserMessage(text);
  userInput.value = "";

  // Typing indicator
  const typingId = addTypingIndicator();

  // Fake "thinking" delay
  setTimeout(() => {
    removeTypingIndicator(typingId);
    const reply = generateJarvisReply(text);
    addJarvisMessage(reply);
  }, 700 + Math.random() * 700);
});

// Functions

function addUserMessage(text) {
  const row = document.createElement("div");
  row.className = "msg-row user";

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble user";

  const meta = document.createElement("div");
  meta.className = "msg-meta";
  meta.textContent = "YOU";

  const msg = document.createElement("div");
  msg.className = "msg-text";
  msg.textContent = text;

  bubble.appendChild(meta);
  bubble.appendChild(msg);
  row.appendChild(bubble);
  chatWindow.appendChild(row);
  scrollChatToBottom();
}

function addJarvisMessage(text) {
  const row = document.createElement("div");
  row.className = "msg-row ai";

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble ai";

  const meta = document.createElement("div");
  meta.className = "msg-meta";
  meta.textContent = "JARVIS";

  const msg = document.createElement("div");
  msg.className = "msg-text";
  msg.textContent = text;

  bubble.appendChild(meta);
  bubble.appendChild(msg);
  row.appendChild(bubble);
  chatWindow.appendChild(row);
  scrollChatToBottom();
}

let typingCounter = 0;
function addTypingIndicator() {
  const id = ++typingCounter;

  const row = document.createElement("div");
  row.className = "msg-row ai";
  row.dataset.typingId = String(id);

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble ai";

  const meta = document.createElement("div");
  meta.className = "msg-meta";
  meta.textContent = "JARVIS";

  const msg = document.createElement("div");
  msg.className = "msg-text";

  const dots = document.createElement("div");
  dots.className = "typing-dots";
  dots.innerHTML = "<span></span><span></span><span></span>";

  msg.appendChild(dots);
  bubble.appendChild(meta);
  bubble.appendChild(msg);
  row.appendChild(bubble);
  chatWindow.appendChild(row);
  scrollChatToBottom();

  return id;
}

function removeTypingIndicator(id) {
  const nodes = chatWindow.querySelectorAll("[data-typing-id]");
  nodes.forEach((node) => {
    if (Number(node.dataset.typingId) === id) {
      chatWindow.removeChild(node);
    }
  });
}

function scrollChatToBottom() {
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  footerClock.textContent = time;
}

/**
 * Simple “fake AI” logic.
 * You can extend this however you want.
 */
function generateJarvisReply(input) {
  const text = input.toLowerCase();

  // Basic intent checks
  if (includesAny(text, ["time", "current time", "what time"])) {
    const now = new Date();
    const time = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `Current time is ${time}, as per system clock.`;
  }

  if (includesAny(text, ["date", "today", "what day"])) {
    const now = new Date();
    const date = now.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return `Today is ${date}.`;
  }

  if (includesAny(text, ["who are you", "what are you", "introduce"])) {
    return "I am JARVIS, a web-based interface built for you, Aashu. I run entirely in your browser, no backend required.";
  }

  if (includesAny(text, ["owner", "boss", "creator", "made you"])) {
    return "My owner is Aashu, also known as @T4xie. I exist to assist and flex his tech skills.";
  }

  if (includesAny(text, ["system status", "system", "status", "online"])) {
    return "All systems are nominal. Power levels stable. No anomalies detected in this sandbox environment.";
  }

  if (includesAny(text, ["clear chat", "reset", "wipe"])) {
    clearChat();
    return "Chat cleared. Fresh start, sir.";
  }

  if (includesAny(text, ["hi", "hello", "yo", "hey"])) {
    return randomFrom([
      "Hello, Aashu. What do you want me to analyze?",
      "Online and listening. Drop your question.",
      "Always here, always awake. Go ahead.",
    ]);
  }

  // Default smart-ish reply
  return randomFrom([
    "Processing your query in demo mode. I can't call real APIs here, but I can still reason about what you asked.",
    "Interesting question. Even in this static GitHub setup, I can help you think it through logically.",
    "I’m running as a front-end Jarvis. No server, no database. Just pure interface and logic in your browser.",
    "I understand what you're asking. In a full version with a backend, I could fetch real data. Here, I answer from my local brain.",
  ]);
}

function includesAny(text, keys) {
  return keys.some((k) => text.includes(k));
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clearChat() {
  chatWindow.innerHTML = "";
}
