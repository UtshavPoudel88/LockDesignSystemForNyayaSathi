import { useState } from "react";

// ── Client data ────────────────────────────────────────────────────────────────

const ACTIVE_CASES = [
  { id: 1, title: "Property Dispute — Lalitpur", category: "Civil", status: "In Progress", statusColor: "bg-[#E8EEF9] text-[#003893]", updated: "2 hours ago" },
  { id: 2, title: "Employment Termination", category: "Labour", status: "Lawyer Assigned", statusColor: "bg-[#ECFDF3] text-[#027A48]", updated: "Yesterday" },
  { id: 3, title: "Domestic Violence — Protection Order", category: "Criminal", status: "Urgent", statusColor: "bg-[#FFF4ED] text-[#C4320A]", updated: "3 hours ago" },
];

const PENDING_REQUESTS = [
  { id: 1, name: "Adv. Sunita Maharjan", spec: "Family Law", avatar: "SM", sent: "Today, 10:42 AM" },
  { id: 2, name: "Adv. Bikram Rai", spec: "Criminal Law", avatar: "BR", sent: "Yesterday" },
];

const RECENT_CHATS_CLIENT = [
  { id: 1, name: "Adv. Priya Shrestha", last: "I'll review your documents by tomorrow.", time: "11:20 AM", avatar: "PS", unread: 0 },
  { id: 2, name: "AI Assistant", last: "Your situation may qualify under Section 22...", time: "9:05 AM", avatar: "AI", unread: 2, isAI: true },
];

// ── Lawyer data ────────────────────────────────────────────────────────────────

const INCOMING_REQUESTS = [
  { id: 1, name: "Ramesh K. Sharma", issue: "Employment Termination — wrongful dismissal", avatar: "RS", received: "10:42 AM", urgent: false },
  { id: 2, name: "Sita Tamang", issue: "Domestic violence — protection order needed", avatar: "ST", received: "8:15 AM", urgent: true },
  { id: 3, name: "Mohan Thapa", issue: "Property boundary dispute — Lalitpur", avatar: "MT", received: "Yesterday", urgent: false },
];

const ACTIVE_CLIENTS = [
  { id: 1, name: "Prem Bahadur KC", case: "Labour Act violation · Section 11", avatar: "PK", lastMessage: "Can you check the documents I sent?", time: "11:20 AM", unread: 3 },
  { id: 2, name: "Anita Shrestha", case: "Property inheritance dispute", avatar: "AS", lastMessage: "Court date confirmed for Sep 10.", time: "9:04 AM", unread: 0 },
  { id: 3, name: "Dinesh Rai", case: "Employment contract review", avatar: "DR", lastMessage: "Thank you, that's very helpful.", time: "Mon", unread: 0 },
];

// ── Shared icon ────────────────────────────────────────────────────────────────

function VerifiedBadge() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <circle cx="12" cy="12" r="10" fill="#003893" />
      <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function HomeScreen({
  role = "user",
  onNotifications,
  onSettings,
  onDocuments,
}: {
  role?: "user" | "lawyer";
  onNotifications?: () => void;
  onSettings?: () => void;
  onDocuments?: () => void;
}) {
  const [available, setAvailable] = useState(true);

  if (role === "lawyer") {
    return (
      <div className="flex flex-col h-full bg-[#F2F4F7] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#003893] px-5 pt-14 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-xs font-medium mb-0.5">Namaste 🙏</p>
              <h1 className="text-white text-lg font-semibold">Adv. Sunita Maharjan</h1>
              <div className="flex items-center gap-1.5 mt-1">
                <VerifiedBadge />
                <span className="text-white/70 text-xs">Labour Law · Kathmandu</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onNotifications} className="relative w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#DC143C] border border-[#003893]" />
              </button>
              <button onClick={onSettings} className="relative">
                <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-sm border-2 border-white/30">SM</div>
                <div className={`absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#003893] ${available ? "bg-[#12B76A]" : "bg-[#D0D5DD]"}`} />
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: "Active clients", value: "4" },
              { label: "New requests", value: "3" },
              { label: "Rating", value: "4.9 ★" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-2.5 text-center border border-white/15">
                <p className="text-white font-bold text-base">{s.value}</p>
                <p className="text-white/55 text-[10px] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Availability toggle */}
          <button onClick={() => setAvailable(!available)}
            className="mt-3 w-full rounded-xl bg-white/10 border border-white/15 px-4 py-2.5 flex items-center justify-between active:bg-white/15 transition">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${available ? "bg-[#12B76A]" : "bg-[#D0D5DD]"}`} />
              <span className="text-white/80 text-xs font-medium">{available ? "Available for new consultations" : "Not accepting new requests"}</span>
            </div>
            <div className={`relative w-9 h-5 rounded-full transition-colors ${available ? "bg-[#12B76A]" : "bg-white/20"}`}>
              <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
                style={{ transform: available ? "translateX(18px)" : "translateX(2px)" }} />
            </div>
          </button>
        </div>

        {/* Quick access */}
        <div className="flex gap-2.5 px-4 pt-4">
          {[
            { label: "Documents", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#003893" strokeWidth="2" /><path d="M14 2v6h6" stroke="#003893" strokeWidth="2" strokeLinecap="round" /></svg>, action: onDocuments },
            { label: "Notifications", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#003893" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>, action: onNotifications },
            { label: "Settings", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" stroke="#003893" strokeWidth="2" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="#003893" strokeWidth="2" /></svg>, action: onSettings },
          ].map((q) => (
            <button key={q.label} onClick={q.action}
              className="flex-1 bg-white rounded-2xl py-3 flex flex-col items-center gap-1.5 active:bg-[#F2F4F7] transition"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              {q.icon}
              <span className="text-[10px] font-medium text-[#667085]">{q.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 px-4 py-4 pb-6">
          {/* Incoming consultation requests */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-[#1A1A1A]">Incoming Requests</h2>
                <span className="w-5 h-5 rounded-full bg-[#DC143C] text-white text-[10px] font-bold flex items-center justify-center">3</span>
              </div>
              <button className="text-xs font-medium text-[#003893]">See all</button>
            </div>
            <div className="flex flex-col gap-2.5">
              {INCOMING_REQUESTS.map((r) => (
                <div key={r.id} className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E8EEF9] flex items-center justify-center text-[#003893] font-semibold text-sm flex-shrink-0">
                      {r.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-[#1A1A1A]">{r.name}</p>
                        {r.urgent && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF4ED] text-[#C4320A]">Urgent</span>}
                      </div>
                      <p className="text-xs text-[#667085] mt-0.5 leading-relaxed">{r.issue}</p>
                      <p className="text-[11px] text-[#98A2B3] mt-1">{r.received}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 py-2 rounded-xl bg-[#003893] text-white text-xs font-semibold active:opacity-90 transition">Accept</button>
                    <button className="flex-1 py-2 rounded-xl bg-[#F2F4F7] text-[#667085] text-xs font-semibold active:bg-[#E4E7EC] transition">Decline</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Active clients */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[#1A1A1A]">Active Clients</h2>
              <button className="text-xs font-medium text-[#003893]">See all</button>
            </div>
            <div className="flex flex-col gap-2" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <div className="bg-white rounded-2xl overflow-hidden">
                {ACTIVE_CLIENTS.map((c, i) => (
                  <div key={c.id}>
                    <button className="w-full px-4 py-3.5 flex items-center gap-3 active:bg-[#F9FAFB] transition text-left">
                      <div className="relative flex-shrink-0">
                        <div className="w-11 h-11 rounded-full bg-[#E8EEF9] flex items-center justify-center text-[#003893] font-semibold text-sm">{c.avatar}</div>
                        {c.unread > 0 && <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#003893] border-2 border-white flex items-center justify-center">
                          <span className="text-white text-[8px] font-bold">{c.unread}</span>
                        </div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1A1A1A]">{c.name}</p>
                        <p className="text-[11px] text-[#003893] font-medium truncate">{c.case}</p>
                        <p className="text-xs text-[#667085] truncate mt-0.5">{c.lastMessage}</p>
                      </div>
                      <p className="text-[11px] text-[#98A2B3] flex-shrink-0">{c.time}</p>
                    </button>
                    {i < ACTIVE_CLIENTS.length - 1 && <div className="h-px bg-[#F2F4F7] ml-[64px]" />}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // ── Client / user home ───────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full bg-[#F2F4F7] overflow-y-auto">
      {/* Greeting bar */}
      <div className="bg-[#003893] px-5 pt-14 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/60 text-xs font-medium mb-0.5">Namaste 🙏</p>
            <h1 className="text-white text-lg font-semibold">Ramesh Sharma</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onNotifications} className="relative w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#DC143C] border border-[#003893]" />
            </button>
            <button onClick={onSettings} className="relative">
              <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-sm border-2 border-white/30">RS</div>
              <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#12B76A] border-2 border-[#003893]" />
            </button>
          </div>
        </div>

        {/* Start new consultation card */}
        <button className="mt-5 w-full rounded-2xl bg-white/10 border border-white/20 p-4 text-left backdrop-blur-sm active:bg-white/15 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold text-base">Start new consultation</p>
              <p className="text-white/60 text-xs mt-0.5">Describe your legal problem to our AI</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#DC143C] flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
            <span className="text-white/80 text-[11px] font-medium">AI Assistant — not a lawyer</span>
          </div>
        </button>
      </div>

      {/* Quick access */}
      <div className="flex gap-2.5 px-4 pt-4">
        {[
          { label: "Documents", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#003893" strokeWidth="2" /><path d="M14 2v6h6" stroke="#003893" strokeWidth="2" strokeLinecap="round" /></svg>, action: onDocuments },
          { label: "Notifications", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#003893" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>, action: onNotifications },
          { label: "Settings", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" stroke="#003893" strokeWidth="2" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="#003893" strokeWidth="2" /></svg>, action: onSettings },
        ].map((q) => (
          <button key={q.label} onClick={q.action}
            className="flex-1 bg-white rounded-2xl py-3 flex flex-col items-center gap-1.5 active:bg-[#F2F4F7] transition"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
            {q.icon}
            <span className="text-[10px] font-medium text-[#667085]">{q.label}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 pb-6">
        {/* Active cases */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[#1A1A1A]">Active Cases</h2>
            <button className="text-xs font-medium text-[#003893]">See all</button>
          </div>
          <div className="flex flex-col gap-2.5">
            {ACTIVE_CASES.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl p-4 flex flex-col gap-2" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-[#1A1A1A] leading-snug flex-1">{c.title}</p>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${c.statusColor}`}>{c.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F2F4F7] text-[#667085] font-medium">{c.category}</span>
                  <span className="text-[11px] text-[#98A2B3]">· Updated {c.updated}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pending lawyer requests */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[#1A1A1A]">Pending Lawyer Requests</h2>
            <button className="text-xs font-medium text-[#003893]">See all</button>
          </div>
          <div className="flex flex-col gap-2.5">
            {PENDING_REQUESTS.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl p-4 flex items-center gap-3" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <div className="w-10 h-10 rounded-full bg-[#E8EEF9] flex items-center justify-center text-[#003893] font-semibold text-sm flex-shrink-0">
                  {r.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A1A1A]">{r.name}</p>
                  <p className="text-xs text-[#667085]">{r.spec} · Sent {r.sent}</p>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FFF9E6] text-[#B54708]">Pending</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent chats */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[#1A1A1A]">Recent Chats</h2>
            <button className="text-xs font-medium text-[#003893]">See all</button>
          </div>
          <div className="flex flex-col gap-2.5">
            {RECENT_CHATS_CLIENT.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl p-4 flex items-center gap-3" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 ${c.isAI ? "bg-[#003893] text-white" : "bg-[#E8EEF9] text-[#003893]"}`}>
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium text-[#1A1A1A] truncate">{c.name}</p>
                    {c.isAI && <span className="text-[10px] bg-[#E8EEF9] text-[#003893] px-1.5 py-0.5 rounded font-medium flex-shrink-0">AI</span>}
                  </div>
                  <p className="text-xs text-[#667085] truncate mt-0.5">{c.last}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <p className="text-[11px] text-[#98A2B3]">{c.time}</p>
                  {c.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#003893] text-white text-[10px] font-bold flex items-center justify-center">{c.unread}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
