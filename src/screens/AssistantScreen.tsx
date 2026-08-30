import { useState } from "react";

const SESSIONS = [
  {
    id: 1,
    title: "Property dispute with landlord",
    category: "Civil Law",
    categoryColor: "bg-[#E8EEF9] text-[#003893]",
    date: "Aug 28, 2026",
    status: "Ongoing",
    statusColor: "bg-[#ECFDF3] text-[#027A48]",
    preview: "Your landlord cannot evict you without 35 days notice under the Rent Act...",
  },
  {
    id: 2,
    title: "Wrongful termination by employer",
    category: "Labour Law",
    categoryColor: "bg-[#FFF4ED] text-[#B54708]",
    date: "Aug 25, 2026",
    status: "Completed",
    statusColor: "bg-[#F2F4F7] text-[#667085]",
    preview: "Based on what you've described, Section 50 of the Labour Act may apply...",
  },
  {
    id: 3,
    title: "Domestic violence protection order",
    category: "Criminal Law",
    categoryColor: "bg-[#FFF1F3] text-[#C4320A]",
    date: "Aug 22, 2026",
    status: "Referred to Lawyer",
    statusColor: "bg-[#EEF4FF] text-[#3538CD]",
    preview: "This situation requires immediate legal intervention. I recommend...",
  },
  {
    id: 4,
    title: "Land registration process",
    category: "Property Law",
    categoryColor: "bg-[#F0FDF4] text-[#027A48]",
    date: "Aug 19, 2026",
    status: "Completed",
    statusColor: "bg-[#F2F4F7] text-[#667085]",
    preview: "To register land in Nepal, you'll need the following documents...",
  },
  {
    id: 5,
    title: "Business registration — sole proprietorship",
    category: "Business Law",
    categoryColor: "bg-[#F5F3FF] text-[#5925DC]",
    date: "Aug 14, 2026",
    status: "Completed",
    statusColor: "bg-[#F2F4F7] text-[#667085]",
    preview: "Registering a sole proprietorship in Nepal involves registration at...",
  },
];

export default function AssistantScreen({ onNewConsultation }: { onNewConsultation?: () => void }) {
  const [search, setSearch] = useState("");
  const filtered = SESSIONS.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7]">
      {/* Header */}
      <div className="bg-[#003893] px-5 pt-14 pb-5">
        <h1 className="text-white text-lg font-semibold">AI Assistant</h1>
        <p className="text-white/60 text-xs mt-0.5">Your saved consultations</p>
      </div>

      {/* Banner */}
      <div className="mx-4 mt-4 rounded-xl bg-[#E8EEF9] border border-[#003893]/20 px-4 py-3 flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-[#003893] flex items-center justify-center flex-shrink-0">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
            <path d="M12 8v4M12 16h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-xs text-[#003893] font-medium leading-snug">
          AI Assistant — not a lawyer. Responses are guidance only, not legal advice.
        </p>
      </div>

      {/* Search */}
      <div className="px-4 mt-3">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]" width="16" height="16" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search consultations..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#E4E7EC] text-sm text-[#1A1A1A] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#003893]/30 focus:border-[#003893] transition"
          />
        </div>
      </div>

      {/* Session list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 pb-28">
        {filtered.map((s) => (
          <button key={s.id} className="bg-white rounded-2xl p-4 text-left flex flex-col gap-2.5 active:bg-[#F9FAFB] transition" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold text-[#1A1A1A] leading-snug flex-1">{s.title}</p>
              <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${s.statusColor}`}>{s.status}</span>
            </div>
            <p className="text-xs text-[#667085] leading-relaxed line-clamp-2">{s.preview}</p>
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${s.categoryColor}`}>{s.category}</span>
              <span className="text-[11px] text-[#98A2B3]">· {s.date}</span>
            </div>
          </button>
        ))}
      </div>

      {/* FAB */}
      <div className="absolute bottom-[80px] right-5">
        <button onClick={onNewConsultation} className="flex items-center gap-2 bg-[#003893] text-white rounded-2xl px-5 py-3.5 font-semibold text-sm shadow-lg active:opacity-90 transition" style={{ boxShadow: "0 8px 24px rgba(0,56,147,0.35)" }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          New consultation
        </button>
      </div>
    </div>
  );
}
