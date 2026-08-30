import { useState, useRef, useEffect } from "react";

type Message = {
  id: number;
  role: "lawyer" | "user";
  text: string;
  time: string;
  read: boolean;
  attachment?: { name: string; size: string };
};

const INITIAL_MESSAGES: Message[] = [
  { id: 1, role: "lawyer", text: "Namaste Ramesh ji. I have reviewed your case brief regarding the wrongful termination. It is a strong case under Section 149 of the Labour Act 2074.", time: "9:14 AM", read: true },
  { id: 2, role: "lawyer", text: "Please share your employment contract and the most recent salary slips when you can. These will be the primary exhibits.", time: "9:15 AM", read: true },
  { id: 3, role: "user", text: "Namaste. Thank you for accepting my request. I have the contract from 2022 and all salary slips for the last 12 months.", time: "9:32 AM", read: true },
  { id: 4, role: "user", text: "Should I also collect any witness statements from my colleagues?", time: "9:32 AM", read: true },
  { id: 5, role: "lawyer", text: "Yes, witness statements would strengthen your position significantly. Ask 1–2 colleagues who were present or aware of the termination circumstances.", time: "9:48 AM", read: true },
  { id: 6, role: "lawyer", text: "I will draft a formal notice to your employer this week. Once served, they have 15 days to respond.", time: "9:49 AM", read: false, attachment: { name: "Draft_Notice_EverestTrading.pdf", size: "48 KB" } },
];

const MENU_ITEMS = ["Share case brief", "View shared files", "Close consultation", "Report issue"];

export default function ChatRoomScreen({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg: Message = {
      id: Date.now(),
      role: "user",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");
    // Simulate lawyer typing
    setTimeout(() => setTyping(true), 800);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "lawyer",
          text: "Understood. I will take note of that. Please do send the documents when ready — secure upload is available in 'Shared files'.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          read: false,
        },
      ]);
    }, 2800);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top bar */}
      <div className="bg-[#003893] px-4 pt-14 pb-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-white/80 flex-shrink-0">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          {/* Avatar + name */}
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/20 border border-white/25 flex items-center justify-center text-white font-bold text-xs">SM</div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#12B76A] border-2 border-[#003893]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-white font-semibold text-sm truncate">Adv. Sunita Maharjan</p>
              {/* Verified badge */}
              <div className="flex items-center gap-1 bg-white/15 rounded-full px-2 py-0.5 flex-shrink-0">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#fff" fillOpacity=".3" />
                  <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-white/90 text-[10px] font-semibold">Verified Lawyer</span>
              </div>
            </div>
            <p className="text-white/55 text-[11px] mt-0.5">Labour Law · Online now</p>
          </div>

          {/* Menu */}
          <div className="relative flex-shrink-0">
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/80">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="1.5" fill="currentColor" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                <circle cx="12" cy="19" r="1.5" fill="currentColor" />
              </svg>
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-10 z-20 bg-white rounded-2xl overflow-hidden w-52"
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
                  {MENU_ITEMS.map((item, i) => (
                    <button key={item} onClick={() => setMenuOpen(false)}
                      className={`w-full text-left px-4 py-3.5 text-sm transition hover:bg-[#F9FAFB] ${item === "Close consultation" || item === "Report issue" ? "text-[#C4320A]" : "text-[#1A1A1A]"} ${i < MENU_ITEMS.length - 1 ? "border-b border-[#F2F4F7]" : ""}`}>
                      {item}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Case context strip */}
      <div className="bg-[#E8EEF9] border-b border-[#D0D5DD]/40 px-4 py-2 flex items-center gap-2 flex-shrink-0">
        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" className="text-[#003893]">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
          <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p className="text-[11px] font-medium text-[#003893]">Case: Wrongful Termination — Everest Trading Pvt. Ltd.</p>
        <button className="ml-auto text-[11px] text-[#003893] font-semibold">View brief</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
        {/* Date separator */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-[#F2F4F7]" />
          <span className="text-[11px] text-[#98A2B3] font-medium">Today, August 30</span>
          <div className="flex-1 h-px bg-[#F2F4F7]" />
        </div>

        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div key={msg.id} className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
              {!isUser && (
                <div className="w-7 h-7 rounded-full bg-[#E8EEF9] flex items-center justify-center text-[#003893] text-[10px] font-bold flex-shrink-0 mt-auto mb-1">SM</div>
              )}
              <div className={`max-w-[76%] flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
                {/* Attachment */}
                {msg.attachment && (
                  <div className={`rounded-xl border px-3 py-2.5 flex items-center gap-2.5 ${isUser ? "bg-[#003893]/10 border-[#003893]/20" : "bg-[#F2F4F7] border-[#E4E7EC]"}`}>
                    <div className="w-8 h-8 rounded-lg bg-[#003893] flex items-center justify-center flex-shrink-0">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#fff" strokeWidth="2" /><path d="M14 2v6h6M9 13h6M9 17h4" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#1A1A1A] leading-tight">{msg.attachment.name}</p>
                      <p className="text-[10px] text-[#98A2B3]">{msg.attachment.size}</p>
                    </div>
                  </div>
                )}

                <div className={`rounded-2xl px-3.5 py-2.5 ${isUser ? "bg-[#003893] text-white rounded-tr-sm" : "bg-[#F2F4F7] text-[#1A1A1A] rounded-tl-sm"}`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>

                {/* Time + read ticks */}
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-[#98A2B3]">{msg.time}</span>
                  {isUser && (
                    <svg width="14" height="10" fill="none" viewBox="0 0 16 12">
                      {msg.read
                        ? <><path d="M1 6l4 4L14 1" stroke="#003893" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 6l4 4" stroke="#003893" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></>
                        : <path d="M1 6l4 4L14 1" stroke="#D0D5DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      }
                    </svg>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {typing && (
          <div className="flex gap-2 items-end">
            <div className="w-7 h-7 rounded-full bg-[#E8EEF9] flex items-center justify-center text-[#003893] text-[10px] font-bold flex-shrink-0">SM</div>
            <div className="bg-[#F2F4F7] rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#98A2B3] animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.9s" }} />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="flex-shrink-0 px-3 pb-5 pt-3 border-t border-[#F2F4F7] bg-white">
        <div className="flex items-end gap-2">
          {/* Attachment */}
          <button onClick={() => fileInputRef.current?.click()}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#667085] bg-[#F2F4F7] flex-shrink-0 active:bg-[#E4E7EC] transition">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <input ref={fileInputRef} type="file" className="hidden" />

          {/* Text */}
          <div className="flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Message Adv. Maharjan..."
              rows={1}
              className="w-full rounded-2xl border border-[#E4E7EC] bg-[#F9FAFB] px-4 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#98A2B3] resize-none focus:outline-none focus:ring-2 focus:ring-[#003893]/30 focus:border-[#003893] transition"
              style={{ maxHeight: 96, overflowY: "auto" }}
            />
          </div>

          {/* Send */}
          <button onClick={sendMessage} disabled={!input.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition ${input.trim() ? "bg-[#003893] active:opacity-80" : "bg-[#E4E7EC]"}`}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke={input.trim() ? "#fff" : "#98A2B3"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
