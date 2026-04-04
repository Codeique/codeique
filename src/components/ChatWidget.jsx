import { useState, useEffect, useRef } from "react";
import chatData from "../data/chatData.json";
import { useLang } from "../context/LangContext";
import { useTheme } from "../context/ThemeContext";

// ─── CONFIG ────────────────────────────────────────────────────────────────
// Proxied through the Cloudflare Pages Function at functions/api/contact.js
// so there are zero CORS issues and we get real error responses.
const CONTACT_API = "/api/contact";

// ─── HELPERS ───────────────────────────────────────────────────────────────
function parseMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");
}

/** Resolve a possibly-bilingual string to the current lang's value */
function resolve(value, lang) {
  if (value && typeof value === "object") return value[lang] ?? value["en"] ?? "";
  return value ?? "";
}

// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────
function BotMessage({ rawText, lang, animate }) {
  const resolved = resolve(rawText, lang);
  return (
    <div
      className={`cw-flex-row ${animate ? "msg-enter" : ""}`}
      style={{ maxWidth: "88%" }}
    >
      <div className="bot-avatar">🤖</div>
      <div
        className="bot-bubble"
        dangerouslySetInnerHTML={{ __html: parseMarkdown(resolved) }}
      />
    </div>
  );
}

function UserMessage({ text }) {
  return (
    <div className="cw-flex-row cw-justify-end msg-enter" style={{ maxWidth: "88%", alignSelf: "flex-end" }}>
      <div className="user-bubble">{text}</div>
    </div>
  );
}

function OptionButtons({ options, onSelect, disabled, lang }) {
  return (
    <div className="options-wrap">
      {options.map((opt) => (
        <button
          key={opt.next}
          className="option-btn"
          onClick={() => onSelect(opt)}
          disabled={disabled}
        >
          {resolve(opt.label, lang)}
        </button>
      ))}
    </div>
  );
}

function ContactForm({ onSubmit, sending, sent, error, tc }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (sent) {
    return <div className="sent-msg msg-enter">{tc.sent}</div>;
  }

  return (
    <form className="contact-form msg-enter" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder={tc.namePlaceholder}
        value={form.name}
        onChange={handleChange}
        required
        className="chat-input-field"
      />
      <input
        type="email"
        name="email"
        placeholder={tc.emailPlaceholder}
        value={form.email}
        onChange={handleChange}
        required
        className="chat-input-field"
      />
      <textarea
        name="message"
        placeholder={tc.messagePlaceholder}
        value={form.message}
        onChange={handleChange}
        rows={3}
        className="chat-input-field"
        style={{ resize: "none" }}
      />
      {error && <p className="form-error">{error}</p>}
      <button type="submit" className="submit-btn" disabled={sending}>
        {sending ? tc.sending : tc.send}
      </button>
    </form>
  );
}

function TypingIndicator() {
  return (
    <div className="cw-flex-row">
      <div className="bot-avatar">🤖</div>
      <div className="bot-bubble typing-bubble">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}

// ─── THEME TOKENS ──────────────────────────────────────────────────────────
const tokens = {
  dark: {
    launcherBg: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)",
    launcherBorder: "rgba(255,255,255,0.12)",
    windowBg: "#0d0d0d",
    windowBorder: "rgba(255,255,255,0.08)",
    windowShadow: "0 24px 80px rgba(0,0,0,0.7)",
    headerBg: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)",
    headerBorder: "rgba(255,255,255,0.06)",
    headerName: "#fff",
    iconBtnBg: "rgba(255,255,255,0.06)",
    iconBtnColor: "rgba(255,255,255,0.5)",
    iconBtnHoverBg: "rgba(255,255,255,0.12)",
    iconBtnHoverColor: "#fff",
    scrollbar: "rgba(255,255,255,0.1)",
    botBubbleBg: "rgba(255,255,255,0.06)",
    botBubbleBorder: "rgba(255,255,255,0.08)",
    botBubbleColor: "rgba(255,255,255,0.9)",
    dotColor: "rgba(255,255,255,0.4)",
    optionBg: "rgba(99,102,241,0.1)",
    optionBorder: "rgba(99,102,241,0.3)",
    optionColor: "rgba(255,255,255,0.85)",
    optionHoverBg: "rgba(99,102,241,0.22)",
    optionHoverBorder: "rgba(99,102,241,0.6)",
    inputBg: "rgba(255,255,255,0.05)",
    inputBorder: "rgba(255,255,255,0.1)",
    inputColor: "#fff",
    inputPlaceholder: "rgba(255,255,255,0.3)",
    footerColor: "rgba(255,255,255,0.2)",
    footerLinkColor: "rgba(99,102,241,0.6)",
    footerBorder: "rgba(255,255,255,0.05)",
    badgeBorder: "#0f0f0f",
  },
  light: {
    launcherBg: "linear-gradient(135deg, #4F8EF7 0%, #8B5CF6 100%)",
    launcherBorder: "rgba(79,142,247,0.3)",
    windowBg: "#ffffff",
    windowBorder: "rgba(0,0,0,0.08)",
    windowShadow: "0 24px 80px rgba(0,0,0,0.15)",
    headerBg: "linear-gradient(135deg, #4F8EF7 0%, #8B5CF6 100%)",
    headerBorder: "rgba(255,255,255,0.15)",
    headerName: "#fff",
    iconBtnBg: "rgba(255,255,255,0.2)",
    iconBtnColor: "rgba(255,255,255,0.8)",
    iconBtnHoverBg: "rgba(255,255,255,0.35)",
    iconBtnHoverColor: "#fff",
    scrollbar: "rgba(0,0,0,0.12)",
    botBubbleBg: "#f3f4f6",
    botBubbleBorder: "rgba(0,0,0,0.06)",
    botBubbleColor: "#1f2937",
    dotColor: "rgba(0,0,0,0.35)",
    optionBg: "rgba(99,102,241,0.07)",
    optionBorder: "rgba(99,102,241,0.25)",
    optionColor: "#4338ca",
    optionHoverBg: "rgba(99,102,241,0.15)",
    optionHoverBorder: "rgba(99,102,241,0.5)",
    inputBg: "#f9fafb",
    inputBorder: "rgba(0,0,0,0.12)",
    inputColor: "#111827",
    inputPlaceholder: "rgba(0,0,0,0.35)",
    footerColor: "rgba(0,0,0,0.35)",
    footerLinkColor: "#6366f1",
    footerBorder: "rgba(0,0,0,0.06)",
    badgeBorder: "#fff",
  },
};

// ─── MAIN WIDGET ───────────────────────────────────────────────────────────
export default function ChatWidget() {
  const { lang, t } = useLang();
  const { theme } = useTheme();
  const tc = t.chat; // chat-specific translation strings
  const tk = tokens[theme] ?? tokens.dark;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [typing, setTyping] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [formState, setFormState] = useState({ sending: false, sent: false, error: null });
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef(null);

  // Boot the chat on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      const startNode = chatData["start"];
      setMessages([{ type: "bot", rawText: startNode.message, id: Date.now() }]);
      setCurrentNode(startNode);
    }
    if (open) setUnread(0);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleOptionSelect = (option) => {
    setButtonsDisabled(true);
    setMessages((prev) => [
      ...prev,
      { type: "user", text: resolve(option.label, lang), id: Date.now() },
    ]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const nextNode = chatData[option.next];
      if (!nextNode) return;
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          rawText: nextNode.message,
          id: Date.now(),
          animate: true,
          node: nextNode,
          nodeId: nextNode.id,
        },
      ]);
      setCurrentNode(nextNode);
      setButtonsDisabled(false);
    }, 700);
  };

  const handleContactSubmit = async (form) => {
    setFormState({ sending: true, sent: false, error: null });
    try {
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "portfolio-chatbot" }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setFormState({ sending: false, sent: false, error: data.message || tc.error });
        return;
      }
      setFormState({ sending: false, sent: true, error: null });
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            rawText: tc.followUp,
            id: Date.now(),
            animate: true,
            node: chatData["start"],
            nodeId: "start",
          },
        ]);
        setCurrentNode(chatData["start"]);
      }, 1200);
    } catch {
      setFormState({ sending: false, sent: false, error: tc.error });
    }
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentNode(null);
    setButtonsDisabled(false);
    setFormState({ sending: false, sent: false, error: null });
    const startNode = chatData["start"];
    setMessages([{ type: "bot", rawText: startNode.message, id: Date.now(), nodeId: "start" }]);
    setCurrentNode(startNode);
  };

  const lastBotNode = [...messages].reverse().find((m) => m.node)?.node || currentNode;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');

        .cw-root * { box-sizing: border-box; font-family: 'Sora', sans-serif; }
        .cw-flex-row { display: flex; align-items: flex-end; gap: 8px; }
        .cw-justify-end { justify-content: flex-end; }

        /* Launcher */
        .cw-launcher {
          position: fixed; bottom: 28px; right: 28px; z-index: 9999;
          width: 58px; height: 58px; border-radius: 50%;
          background: ${tk.launcherBg};
          border: 2px solid ${tk.launcherBorder};
          box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 0 0 rgba(99,102,241,0.4);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s, box-shadow 0.2s;
          animation: pulse-ring 3s ease-in-out infinite;
        }
        .cw-launcher:hover { transform: scale(1.08); box-shadow: 0 12px 40px rgba(0,0,0,0.35); }
        .cw-launcher svg { width: 26px; height: 26px; }
        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 0 0 rgba(99,102,241,0.4); }
          50%  { box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 0 8px rgba(99,102,241,0); }
        }

        /* Unread badge */
        .cw-badge {
          position: absolute; top: -4px; right: -4px;
          width: 20px; height: 20px; border-radius: 50%;
          background: #ef4444; color: #fff;
          font-size: 11px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid ${tk.badgeBorder};
        }

        /* Window */
        .cw-window {
          position: fixed; bottom: 100px; right: 28px; z-index: 9998;
          width: 380px; height: 560px;
          background: ${tk.windowBg};
          border: 1px solid ${tk.windowBorder};
          border-radius: 20px;
          box-shadow: ${tk.windowShadow};
          display: flex; flex-direction: column; overflow: hidden;
          transform-origin: bottom right;
          animation: window-in 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes window-in {
          from { opacity: 0; transform: scale(0.85) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Header */
        .cw-header {
          padding: 16px 20px;
          background: ${tk.headerBg};
          border-bottom: 1px solid ${tk.headerBorder};
          display: flex; align-items: center; gap: 12px;
        }
        .cw-header-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; font-weight: 700; color: #fff;
          flex-shrink: 0;
        }
        .cw-header-info { flex: 1; }
        .cw-header-name { font-size: 14px; font-weight: 600; color: ${tk.headerName}; }
        .cw-header-status { font-size: 11px; color: #22c55e; display: flex; align-items: center; gap: 4px; }
        .cw-header-status::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #22c55e; display: inline-block; }
        .cw-header-actions { display: flex; gap: 6px; }
        .cw-icon-btn {
          width: 30px; height: 30px; border-radius: 8px; border: none;
          background: ${tk.iconBtnBg}; color: ${tk.iconBtnColor};
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, color 0.15s;
        }
        .cw-icon-btn:hover { background: ${tk.iconBtnHoverBg}; color: ${tk.iconBtnHoverColor}; }

        /* Messages area */
        .cw-messages {
          flex: 1; overflow-y: auto; padding: 20px 16px;
          display: flex; flex-direction: column; gap: 12px;
          scrollbar-width: thin; scrollbar-color: ${tk.scrollbar} transparent;
        }
        .cw-messages::-webkit-scrollbar { width: 4px; }
        .cw-messages::-webkit-scrollbar-thumb { background: ${tk.scrollbar}; border-radius: 4px; }

        /* Bot avatar */
        .bot-avatar {
          width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; color: #fff;
        }

        /* Bubbles */
        .bot-bubble {
          background: ${tk.botBubbleBg};
          border: 1px solid ${tk.botBubbleBorder};
          color: ${tk.botBubbleColor};
          padding: 12px 14px; border-radius: 4px 16px 16px 16px;
          font-size: 13px; line-height: 1.6;
          max-width: 100%;
        }
        .user-bubble {
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          color: #fff; padding: 10px 14px;
          border-radius: 16px 4px 16px 16px;
          font-size: 13px; line-height: 1.5;
          font-weight: 500;
        }

        /* Typing */
        .typing-bubble { display: flex; gap: 4px; align-items: center; padding: 14px 16px; }
        .dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: ${tk.dotColor};
          animation: bounce 1.2s ease-in-out infinite;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }

        /* Options */
        .options-wrap {
          display: flex; flex-direction: column; gap: 6px;
          padding: 0 16px 16px 16px;
        }
        .option-btn {
          background: ${tk.optionBg};
          border: 1px solid ${tk.optionBorder};
          color: ${tk.optionColor};
          padding: 10px 14px; border-radius: 10px;
          font-size: 12.5px; font-weight: 500; font-family: 'Sora', sans-serif;
          cursor: pointer; text-align: left;
          transition: background 0.15s, border-color 0.15s, transform 0.1s;
        }
        .option-btn:hover:not(:disabled) {
          background: ${tk.optionHoverBg};
          border-color: ${tk.optionHoverBorder};
          transform: translateX(3px);
        }
        .option-btn:disabled { opacity: 0.4; cursor: default; }

        /* Contact form */
        .contact-form {
          display: flex; flex-direction: column; gap: 8px;
          padding: 0 16px 16px;
        }
        .chat-input-field {
          background: ${tk.inputBg};
          border: 1px solid ${tk.inputBorder};
          border-radius: 10px; color: ${tk.inputColor};
          padding: 10px 12px; font-size: 13px; font-family: 'Sora', sans-serif;
          outline: none; transition: border-color 0.15s;
          width: 100%;
        }
        .chat-input-field::placeholder { color: ${tk.inputPlaceholder}; }
        .chat-input-field:focus { border-color: rgba(99,102,241,0.6); }
        .submit-btn {
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          color: #fff; border: none; border-radius: 10px;
          padding: 11px 16px; font-size: 13px; font-weight: 600;
          font-family: 'Sora', sans-serif; cursor: pointer;
          transition: opacity 0.15s, transform 0.1s;
        }
        .submit-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .submit-btn:disabled { opacity: 0.5; cursor: default; }
        .form-error { color: #f87171; font-size: 12px; margin: 0; }
        .sent-msg {
          margin: 0 16px 16px;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.25);
          color: #86efac; padding: 12px 14px;
          border-radius: 10px; font-size: 13px;
        }

        /* Animations */
        .msg-enter { animation: msg-in 0.3s ease-out; }
        @keyframes msg-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Footer */
        .cw-footer {
          padding: 10px 16px;
          border-top: 1px solid ${tk.footerBorder};
          text-align: center;
          font-size: 10.5px; color: ${tk.footerColor};
        }
        .cw-footer a { color: ${tk.footerLinkColor}; text-decoration: none; }
        .cw-footer a:hover { color: #6366f1; }

        @media (max-width: 440px) {
          .cw-window { width: calc(100vw - 24px); right: 12px; bottom: 90px; height: 70vh; }
          .cw-launcher { right: 16px; bottom: 16px; }
        }
      `}</style>

      <div className="cw-root">
        {/* Launcher button */}
        <button className="cw-launcher" onClick={() => setOpen((o) => !o)} aria-label="Open chat">
          {unread > 0 && !open && <span className="cw-badge">{unread}</span>}
          {open ? (
            <svg fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </button>

        {/* Chat window */}
        {open && (
          <div className="cw-window">
            {/* Header */}
            <div className="cw-header">
              <div className="cw-header-avatar">🤖</div>
              <div className="cw-header-info">
                <div className="cw-header-name">Botique</div>
                <div className="cw-header-status">{tc.status}</div>
              </div>
              <div className="cw-header-actions">
                <button className="cw-icon-btn" onClick={resetChat} title={tc.restartTitle}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button className="cw-icon-btn" onClick={() => setOpen(false)} title={tc.closeTitle}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="cw-messages">
              {messages.map((msg) =>
                msg.type === "bot" ? (
                  <BotMessage key={msg.id} rawText={msg.rawText} lang={lang} animate={msg.animate} />
                ) : (
                  <UserMessage key={msg.id} text={msg.text} />
                )
              )}
              {typing && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Options or contact form */}
            {!typing && lastBotNode && (
              lastBotNode.type === "contact_form" ? (
                <ContactForm
                  onSubmit={handleContactSubmit}
                  sending={formState.sending}
                  sent={formState.sent}
                  error={formState.error}
                  tc={tc}
                />
              ) : lastBotNode.options ? (
                <OptionButtons
                  options={lastBotNode.options}
                  onSelect={handleOptionSelect}
                  disabled={buttonsDisabled}
                  lang={lang}
                />
              ) : null
            )}

            {/* Footer */}
            <div className="cw-footer">
              {tc.footer} <a href="#" target="_blank" rel="noreferrer">Botique</a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
