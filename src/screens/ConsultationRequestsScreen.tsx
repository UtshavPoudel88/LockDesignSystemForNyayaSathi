import { useState } from "react";

type Status = "Requested" | "Clarification Requested" | "Accepted" | "Declined";

const STATUS_STYLES: Record<Status, { pill: string; dot: string; label: string }> = {
  "Requested": { pill: "bg-[#E8EEF9] text-[#003893]", dot: "bg-[#003893]", label: "Awaiting response" },
  "Clarification Requested": { pill: "bg-[#FFF9E6] text-[#B54708]", dot: "bg-[#F79009]", label: "Lawyer needs more info" },
  "Accepted": { pill: "bg-[#ECFDF3] text-[#027A48]", dot: "bg-[#12B76A]", label: "Consultation confirmed" },
  "Declined": { pill: "bg-[#F2F4F7] text-[#667085]", dot: "bg-[#D0D5DD]", label: "Not available for this case" },
};

const REQUESTS = [
  {
    id: 1,
    lawyer: "Adv. Sunita Maharjan",
    spec: "Labour Law",
    initials: "SM",
    category: "Wrongful Termination",
    status: "Accepted" as Status,
    sentDate: "Aug 27, 2026",
    updatedDate: "Aug 28, 2026",
    note: "I have reviewed your case brief. Let's proceed — I'll send a meeting time shortly.",
  },
  {
    id: 2,
    lawyer: "Adv. Rajesh Adhikari",
    spec: "Labour Law",
    initials: "RA",
    category: "Wrongful Termination",
    status: "Clarification Requested" as Status,
    sentDate: "Aug 27, 2026",
    updatedDate: "Aug 28, 2026",
    note: "Please share your employment contract and the dates of any verbal warnings before dismissal.",
  },
  {
    id: 3,
    lawyer: "Adv. Kamala Thapa",
    spec: "Property Law",
    initials: "KT",
    category: "Property Dispute",
    status: "Requested" as Status,
    sentDate: "Aug 25, 2026",
    updatedDate: "Aug 25, 2026",
    note: null,
  },
  {
    id: 4,
    lawyer: "Adv. Deepak Gurung",
    spec: "Business Law",
    initials: "DG",
    category: "Business Registration",
    status: "Declined" as Status,
    sentDate: "Aug 10, 2026",
    updatedDate: "Aug 11, 2026",
    note: "I'm currently at full capacity and cannot take new clients. Please try another lawyer.",
  },
];

export default function ConsultationRequestsScreen({ onBack, onOpenChat }: { onBack: () => void; onOpenChat: () => void }) {
  const [expandedNote, setExpandedNote] = useState<number[]>([1, 2]);

  const toggleNote = (id: number) =>
    setExpandedNote((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7]">
      {/* Header */}
      <div className="bg-[#003893] px-5 pt-14 pb-5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-white/80">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div>
            <h1 className="text-white text-lg font-semibold">Consultation Requests</h1>
            <p className="text-white/55 text-xs mt-0.5">{REQUESTS.length} sent requests</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 pb-6">
        {REQUESTS.map((r) => {
          const s = STATUS_STYLES[r.status];
          const noteVisible = expandedNote.includes(r.id);

          return (
            <div key={r.id} className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <div className="p-4">
                {/* Lawyer row */}
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#E8EEF9] flex items-center justify-center text-[#003893] font-bold text-sm flex-shrink-0">
                    {r.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-[#1A1A1A] truncate">{r.lawyer}</p>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                        <circle cx="12" cy="12" r="10" fill="#003893" />
                        <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="text-xs text-[#667085] mt-0.5">{r.spec} · {r.category}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${s.pill}`}>
                    {r.status}
                  </span>
                </div>

                {/* Status line */}
                <div className="mt-3 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                  <p className="text-xs text-[#667085]">{s.label}</p>
                  <span className="ml-auto text-[11px] text-[#98A2B3]">
                    {r.status === "Requested" ? `Sent ${r.sentDate}` : `Updated ${r.updatedDate}`}
                  </span>
                </div>

                {/* Lawyer note */}
                {r.note && (
                  <div className="mt-3 pt-3 border-t border-[#F2F4F7]">
                    <button onClick={() => toggleNote(r.id)} className="w-full flex items-center justify-between text-left">
                      <p className="text-[11px] font-semibold text-[#667085] uppercase tracking-wide">Lawyer's note</p>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24"
                        className={`text-[#98A2B3] transition-transform ${noteVisible ? "rotate-180" : ""}`}>
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {noteVisible && (
                      <p className="mt-2 text-sm text-[#344054] leading-relaxed bg-[#F9FAFB] rounded-xl px-3 py-2.5 border border-[#F2F4F7]">
                        "{r.note}"
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action row */}
              {(r.status === "Accepted" || r.status === "Clarification Requested") && (
                <div className="border-t border-[#F2F4F7]">
                  <button onClick={onOpenChat}
                    className={`w-full py-3 text-xs font-semibold transition ${r.status === "Accepted" ? "text-[#003893] active:bg-[#E8EEF9]" : "text-[#B54708] active:bg-[#FFF9E6]"}`}>
                    {r.status === "Accepted" ? "Open chat →" : "Reply with clarification →"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
