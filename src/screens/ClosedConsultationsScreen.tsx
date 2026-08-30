import { useState } from "react";

type RatingState = "pending" | "done";

const CONSULTATIONS = [
  {
    id: 1,
    lawyer: "Adv. Deepak Gurung",
    spec: "Business Law",
    initials: "DG",
    category: "Business Registration",
    closedDate: "Aug 14, 2026",
    duration: "12 days",
    outcome: "Resolved",
    rating: "done" as RatingState,
    givenRating: 4,
    summary: "Company registration successfully completed at the Company Registrar's Office.",
  },
  {
    id: 2,
    lawyer: "AI Assistant",
    spec: "AI",
    initials: "AI",
    category: "Land Registration",
    closedDate: "Aug 10, 2026",
    duration: "1 session",
    outcome: "Guidance given",
    rating: "done" as RatingState,
    givenRating: 5,
    summary: "Process and required documents for land registration at the Land Revenue Office explained.",
    isAI: true,
  },
  {
    id: 3,
    lawyer: "Adv. Priya Shrestha",
    spec: "Civil Law",
    initials: "PS",
    category: "Property Boundary Dispute",
    closedDate: "Jul 28, 2026",
    duration: "21 days",
    outcome: "Settled",
    rating: "pending" as RatingState,
    givenRating: 0,
    summary: "Dispute settled through mediation. Boundary agreement signed by both parties.",
  },
  {
    id: 4,
    lawyer: "Adv. Bikram Rai",
    spec: "Criminal Law",
    initials: "BR",
    category: "FIR Filing Assistance",
    closedDate: "Jun 15, 2026",
    duration: "5 days",
    outcome: "Referred",
    rating: "pending" as RatingState,
    givenRating: 0,
    summary: "FIR filed at District Police Office. Case referred to a criminal litigation specialist.",
  },
];

function StarRatingInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)} onClick={() => onChange(i)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill={i <= (hover || value) ? "#F79009" : "#E4E7EC"} className="transition-colors">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function OutcomePill({ outcome }: { outcome: string }) {
  const styles: Record<string, string> = {
    "Resolved": "bg-[#ECFDF3] text-[#027A48]",
    "Settled": "bg-[#ECFDF3] text-[#027A48]",
    "Guidance given": "bg-[#E8EEF9] text-[#003893]",
    "Referred": "bg-[#F2F4F7] text-[#667085]",
  };
  return <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${styles[outcome] ?? "bg-[#F2F4F7] text-[#667085]"}`}>{outcome}</span>;
}

export default function ClosedConsultationsScreen({ onBack, onRate }: { onBack: () => void; onRate?: () => void }) {
  const [items, setItems] = useState(CONSULTATIONS);
  const [rating, setRating] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<number[]>([]);
  const [expanded, setExpanded] = useState<number[]>([]);

  const toggleExpand = (id: number) =>
    setExpanded((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const submitRating = (id: number) => {
    if (!rating[id]) return;
    setItems((prev) =>
      prev.map((c) => c.id === id ? { ...c, rating: "done" as const, givenRating: rating[id] } : c)
    );
    setSubmitted((prev) => [...prev, id]);
  };

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7]">
      {/* Header */}
      <div className="bg-[#003893] px-5 pt-14 pb-5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-white/80">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div>
            <h1 className="text-white text-lg font-semibold">Closed Consultations</h1>
            <p className="text-white/55 text-xs mt-0.5">{items.length} past consultations</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 pb-6">
        {items.map((c) => {
          const isExpanded = expanded.includes(c.id);
          const pendingRating = c.rating === "pending" && !submitted.includes(c.id);
          const doneRating = c.rating === "done" || submitted.includes(c.id);

          return (
            <div key={c.id} className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <div className="p-4">
                {/* Header row */}
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${c.isAI ? "bg-[#003893] text-white" : "bg-[#E8EEF9] text-[#003893]"}`}>
                    {c.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-[#1A1A1A] truncate">{c.lawyer}</p>
                      {!c.isAI && (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                          <circle cx="12" cy="12" r="10" fill="#003893" />
                          <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {c.isAI && <span className="text-[10px] bg-[#E8EEF9] text-[#003893] px-1.5 py-0.5 rounded font-medium flex-shrink-0">AI</span>}
                    </div>
                    <p className="text-xs text-[#667085] mt-0.5">{c.spec} · {c.category}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <OutcomePill outcome={c.outcome} />
                      <span className="text-[11px] text-[#98A2B3]">· {c.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Dates + expand toggle */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#98A2B3]">
                    <svg width="11" height="11" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                    Closed {c.closedDate}
                  </div>
                  <button onClick={() => toggleExpand(c.id)} className="text-[11px] font-medium text-[#003893]">
                    {isExpanded ? "Less" : "Details"}
                  </button>
                </div>

                {/* Expanded summary */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[#F2F4F7]">
                    <p className="text-xs font-semibold text-[#667085] uppercase tracking-wide mb-1.5">Outcome summary</p>
                    <p className="text-sm text-[#344054] leading-relaxed">{c.summary}</p>
                  </div>
                )}

                {/* Rating */}
                <div className="mt-3 pt-3 border-t border-[#F2F4F7]">
                  {doneRating ? (
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-[#667085]">Your rating</p>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <svg key={i} width="14" height="14" viewBox="0 0 24 24"
                            fill={i <= (submitted.includes(c.id) ? rating[c.id] : c.givenRating) ? "#F79009" : "#E4E7EC"}>
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-[#98A2B3]">Thank you</span>
                    </div>
                  ) : pendingRating ? (
                    <div className="flex flex-col gap-2.5">
                      <p className="text-xs font-semibold text-[#1A1A1A]">Rate this {c.isAI ? "AI session" : "lawyer"}</p>
                      <StarRatingInput value={rating[c.id] ?? 0} onChange={(v) => setRating((prev) => ({ ...prev, [c.id]: v }))} />
                      <button onClick={() => { if (rating[c.id]) onRate?.(); else submitRating(c.id); }} disabled={!rating[c.id]}
                        className={`w-full py-2.5 rounded-xl text-xs font-semibold transition ${rating[c.id] ? "bg-[#003893] text-white active:opacity-90" : "bg-[#F2F4F7] text-[#98A2B3]"}`}>
                        Submit rating
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
