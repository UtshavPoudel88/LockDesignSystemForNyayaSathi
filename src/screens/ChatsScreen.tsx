import { useState } from "react";

const ALL_CHATS = [
  // Active
  { id: 1, tab: "active", name: "Adv. Priya Shrestha", spec: "Civil Law", last: "I'll review the documents you sent by tomorrow morning.", time: "11:20 AM", unread: 3, initials: "PS", online: true, verified: true },
  { id: 2, tab: "active", name: "Adv. Sunita Maharjan", spec: "Family Law", last: "Please gather all property documents before our next session.", time: "9:04 AM", unread: 0, initials: "SM", online: true, verified: true },
  { id: 3, tab: "active", name: "AI Assistant", spec: "AI", last: "Based on what you've described, Section 22 of the Labour Act...", time: "Yesterday", unread: 1, initials: "AI", online: true, verified: false, isAI: true },
  { id: 4, tab: "active", name: "Adv. Bikram Rai", spec: "Criminal Law", last: "Your bail hearing has been scheduled for September 5.", time: "Mon", unread: 0, initials: "BR", online: false, verified: true },
  // Requests
  { id: 5, tab: "requests", name: "Adv. Rajesh Adhikari", spec: "Labour Law", last: "Hello, I've reviewed your case summary. I can take this on.", time: "2 hrs ago", unread: 1, initials: "RA", online: true, verified: true },
  { id: 6, tab: "requests", name: "Adv. Kamala Thapa", spec: "Property Law", last: "I specialize in property disputes in the Bagmati region.", time: "Yesterday", unread: 1, initials: "KT", online: false, verified: true },
  // Closed
  { id: 7, tab: "closed", name: "Adv. Deepak Gurung", spec: "Business Law", last: "Your company registration has been completed successfully.", time: "Aug 14", unread: 0, initials: "DG", online: false, verified: true },
  { id: 8, tab: "closed", name: "AI Assistant", spec: "AI", last: "I've summarised the Land Registration process for you.", time: "Aug 10", unread: 0, initials: "AI", online: false, verified: false, isAI: true },
];

const TABS = [
  { id: "active", label: "Active" },
  { id: "requests", label: "Requests" },
  { id: "closed", label: "Closed" },
];

const LAWYER_CHATS = [
  { id: 1, tab: "active", name: "Prem Bahadur KC", spec: "Labour Law violation", last: "Can you check the documents I sent?", time: "11:20 AM", unread: 3, initials: "PK", online: true },
  { id: 2, tab: "active", name: "Anita Shrestha", spec: "Property inheritance", last: "Court date confirmed for Sep 10.", time: "9:04 AM", unread: 0, initials: "AS", online: true },
  { id: 3, tab: "active", name: "Dinesh Rai", spec: "Employment contract", last: "Thank you, that's very helpful.", time: "Mon", unread: 0, initials: "DR", online: false },
  { id: 4, tab: "requests", name: "Ramesh K. Sharma", spec: "Employment Termination", last: "Hello, I need help with wrongful dismissal.", time: "10:42 AM", unread: 1, initials: "RS", online: true },
  { id: 5, tab: "requests", name: "Sita Tamang", spec: "Domestic violence", last: "I urgently need a protection order.", time: "8:15 AM", unread: 1, initials: "ST", online: true },
  { id: 6, tab: "requests", name: "Mohan Thapa", spec: "Property dispute", last: "Boundary issue — Lalitpur district.", time: "Yesterday", unread: 1, initials: "MT", online: false },
  { id: 7, tab: "closed", name: "Gopal Pandey", spec: "Business registration", last: "Registration completed, thank you!", time: "Aug 14", unread: 0, initials: "GP", online: false },
  { id: 8, tab: "closed", name: "Kamala Adhikari", spec: "Family mediation", last: "Case settled through mediation.", time: "Aug 6", unread: 0, initials: "KA", online: false },
];

export default function ChatsScreen({
  role = "user",
  onOpenChat,
  onOpenRequests,
  onOpenClosed,
}: {
  role?: "user" | "lawyer";
  onOpenChat?: () => void;
  onOpenRequests?: () => void;
  onOpenClosed?: () => void;
}) {
  const [tab, setTab] = useState<"active" | "requests" | "closed">("active");
  const source = role === "lawyer" ? LAWYER_CHATS : ALL_CHATS;
  const chats = source.filter((c) => c.tab === tab);
  const requestCount = source.filter((c) => c.tab === "requests" && c.unread > 0).length;

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7]">
      {/* Header */}
      <div className="bg-[#003893] px-5 pt-14 pb-0">
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-white text-lg font-semibold">Chats</h1>
          <button className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/15">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => { setTab(t.id as any); if (t.id === "requests") onOpenRequests?.(); else if (t.id === "closed") onOpenClosed?.(); }}
              className={`flex-1 py-3 text-sm font-medium relative transition ${tab === t.id ? "text-white" : "text-white/50"}`}>
              <span className="flex items-center justify-center gap-1.5">
                {t.label}
                {t.id === "requests" && requestCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#DC143C] text-white text-[10px] font-bold flex items-center justify-center">{requestCount}</span>
                )}
              </span>
              {tab === t.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-t-full" />}
            </button>
          ))}
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto bg-white">
        {chats.length === 0 && (
          <div className="flex flex-col items-center justify-center h-48 gap-2">
            <p className="text-[#98A2B3] text-sm">No {tab} conversations</p>
          </div>
        )}
        {chats.map((c, i) => (
          <div key={c.id}>
            <button onClick={onOpenChat} className="w-full px-4 py-3.5 flex items-center gap-3 active:bg-[#F9FAFB] transition text-left">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${c.isAI ? "bg-[#003893] text-white" : "bg-[#E8EEF9] text-[#003893]"}`}>
                  {c.initials}
                </div>
                {c.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#12B76A] border-2 border-white" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className={`text-sm font-medium truncate ${c.unread > 0 ? "text-[#1A1A1A]" : "text-[#344054]"}`}>{c.name}</p>
                  {c.verified && (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                      <circle cx="12" cy="12" r="10" fill="#003893" />
                      <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {c.isAI && <span className="text-[10px] bg-[#E8EEF9] text-[#003893] px-1.5 py-0.5 rounded font-medium flex-shrink-0">AI</span>}
                </div>
                <p className={`text-xs mt-0.5 truncate ${c.unread > 0 ? "text-[#1A1A1A] font-medium" : "text-[#667085]"}`}>{c.last}</p>
              </div>

              {/* Right */}
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <p className="text-[11px] text-[#98A2B3]">{c.time}</p>
                {c.unread > 0
                  ? <span className="w-5 h-5 rounded-full bg-[#003893] text-white text-[10px] font-bold flex items-center justify-center">{c.unread}</span>
                  : <div className="w-5 h-5" />
                }
              </div>
            </button>
            {i < chats.length - 1 && <div className="h-px bg-[#F2F4F7] ml-[64px]" />}
          </div>
        ))}

        {/* Requests action area */}
        {tab === "requests" && chats.length > 0 && (
          <div className="px-4 py-4 border-t border-[#F2F4F7]">
            <p className="text-xs text-[#667085] text-center">Review and accept or decline lawyer requests above</p>
          </div>
        )}
      </div>
    </div>
  );
}
