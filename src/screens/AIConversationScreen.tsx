import { useState, useRef, useEffect } from "react";

type Message = {
  id: number;
  role: "ai" | "user";
  text: string;
  followUp?: { question: string; options: string[] };
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: "ai",
    text: "Namaste! I'm here to help you understand your legal situation. Please describe what's happening — in Nepali or English, whichever is more comfortable.",
  },
  {
    id: 2,
    role: "user",
    text: "My employer terminated me last month without any notice or reason. I had worked there for 4 years.",
  },
  {
    id: 3,
    role: "ai",
    text: "I'm sorry to hear that. Sudden termination after 4 years of service is a serious matter under Nepal's Labour Act 2074. To understand your situation better, I need a few more details.",
    followUp: {
      question: "Did your employer provide any written notice or termination letter before or after dismissal?",
      options: ["Yes, I received a letter", "No, nothing in writing", "I don't know"],
    },
  },
];

const FOLLOW_UP_2: Message = {
  id: 6,
  role: "ai",
  text: "Thank you. Under Section 149 of the Labour Act, termination without cause or prior notice is considered unlawful dismissal. You may be entitled to reinstatement or compensation.\n\nOne more question to complete your case brief:",
  followUp: {
    question: "Were you a permanent employee, or on a fixed-term or probationary contract?",
    options: ["Permanent employee", "Fixed-term contract", "I'm not sure"],
  },
};

const FINAL_AI: Message = {
  id: 9,
  role: "ai",
  text: "Thank you — I have enough to build your case brief. Based on what you've shared, this appears to be a wrongful termination under the Labour Act 2074. I'll now summarise the key facts and help you find a qualified labour law lawyer.\n\nReady to review your case brief?",
};

export default function AIConversationScreen({ onCaseBrief }: { onCaseBrief: () => void }) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [dismissed, setDismissed] = useState<number[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, dismissed]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      if (phase === 1) {
        setMessages((prev) => [...prev, FOLLOW_UP_2]);
        setPhase(2);
      } else if (phase === 2) {
        setMessages((prev) => [...prev, FINAL_AI]);
        setPhase(3);
      }
    }, 700);
  };

  const handleOption = (option: string, msgId: number) => {
    setDismissed((prev) => [...prev, msgId]);
    sendMessage(option);
  };

  const activeFollowUp = messages.find(
    (m) => m.followUp && !dismissed.includes(m.id)
  );

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-[#003893] px-5 pt-14 pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#003893] border-2 border-white/30 flex items-center justify-center text-white font-bold text-sm">
            AI
          </div>
          <div>
            <p className="text-white font-semibold text-sm">AI Legal Assistant</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
              <p className="text-white/60 text-[11px]">Online · Responds instantly</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI disclaimer banner */}
      <div className="flex-shrink-0 mx-4 mt-3 rounded-xl bg-[#E8EEF9] border border-[#003893]/15 px-3.5 py-2.5 flex items-center gap-2.5">
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" className="flex-shrink-0 text-[#003893]">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p className="text-[11px] text-[#003893] font-medium leading-snug">
          AI Assistant — not a lawyer. Guidance only, not legal advice.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {messages.map((msg) => (
          <div key={msg.id}>
            <div className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {msg.role === "ai" && (
                <div className="w-7 h-7 rounded-full bg-[#003893] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-1">AI</div>
              )}
              <div className={`max-w-[78%] rounded-2xl px-4 py-3 ${
                msg.role === "ai"
                  ? "bg-[#F2F4F7] text-[#1A1A1A] rounded-tl-sm"
                  : "bg-[#003893] text-white rounded-tr-sm"
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
              </div>
            </div>

            {/* Follow-up question inline, dismissed once answered */}
            {msg.followUp && !dismissed.includes(msg.id) && (
              <div className="mt-3 ml-9">
                <div className="bg-white border border-[#E4E7EC] rounded-2xl rounded-tl-sm p-4 flex flex-col gap-3"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                  <p className="text-sm font-medium text-[#1A1A1A] leading-snug">{msg.followUp.question}</p>
                  <div className="flex flex-col gap-2">
                    {msg.followUp.options.map((opt) => (
                      <button key={opt} onClick={() => handleOption(opt, msg.id)}
                        className="text-sm text-left px-3.5 py-2.5 rounded-xl border border-[#E4E7EC] text-[#344054] font-medium hover:border-[#003893] hover:bg-[#E8EEF9] hover:text-[#003893] transition">
                        {opt}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-1 border-t border-[#F2F4F7]">
                    <button onClick={() => handleOption("I don't know", msg.id)}
                      className="text-xs text-[#667085] font-medium px-3 py-1.5 rounded-lg hover:bg-[#F2F4F7] transition">
                      I don't know
                    </button>
                    <button onClick={() => { setDismissed((p) => [...p, msg.id]); }}
                      className="text-xs text-[#667085] font-medium px-3 py-1.5 rounded-lg hover:bg-[#F2F4F7] transition">
                      Skip
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* View case brief CTA */}
        {phase === 3 && (
          <div className="mt-2">
            <button onClick={onCaseBrief}
              className="w-full rounded-xl bg-[#003893] py-3.5 text-sm font-semibold text-white active:opacity-90 transition"
              style={{ boxShadow: "0 4px 16px rgba(0,56,147,0.3)" }}>
              View my case brief →
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="flex-shrink-0 px-4 pb-6 pt-3 border-t border-[#F2F4F7] bg-white">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder={activeFollowUp ? "Or type your answer..." : "Type your message..."}
              rows={1}
              className="w-full rounded-2xl border border-[#E4E7EC] bg-[#F9FAFB] px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#98A2B3] resize-none focus:outline-none focus:ring-2 focus:ring-[#003893]/30 focus:border-[#003893] transition"
              style={{ maxHeight: 100, overflowY: "auto" }}
            />
          </div>
          <button onClick={() => sendMessage(input)} disabled={!input.trim()}
            className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition ${input.trim() ? "bg-[#003893] active:opacity-80" : "bg-[#E4E7EC]"}`}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke={input.trim() ? "#fff" : "#98A2B3"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
