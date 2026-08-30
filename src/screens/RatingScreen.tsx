import { useState } from "react";

const CATEGORIES = ["Communication", "Responsiveness", "Clarity", "Professionalism"] as const;

function StarInput({ value, onChange, size = 36 }: { value: number; onChange: (v: number) => void; size?: number }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button key={i}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(i)}
          className="transition-transform active:scale-90">
          <svg width={size} height={size} viewBox="0 0 24 24"
            fill={i <= (hover || value) ? "#F79009" : "none"}
            stroke={i <= (hover || value) ? "#F79009" : "#D0D5DD"}
            strokeWidth="1.5">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

const OVERALL_LABELS: Record<number, string> = {
  1: "Poor", 2: "Fair", 3: "Good", 4: "Very good", 5: "Excellent",
};

export default function RatingScreen({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
  const [overall, setOverall] = useState(0);
  const [cats, setCats] = useState<Record<string, number>>({});
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!overall) return;
    setSubmitted(true);
    setTimeout(onSubmit, 1400);
  };

  if (submitted) {
    return (
      <div className="flex flex-col h-full bg-white items-center justify-center gap-5 px-8">
        <div className="w-20 h-20 rounded-full bg-[#ECFDF3] flex items-center justify-center">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5" stroke="#027A48" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-[#1A1A1A]">Thank you for your review</h2>
          <p className="text-sm text-[#667085] mt-1.5 leading-relaxed">
            Your feedback helps other users find the right legal help.
          </p>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg key={i} width="28" height="28" viewBox="0 0 24 24" fill={i <= overall ? "#F79009" : "#E4E7EC"}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7]">
      {/* Header */}
      <div className="bg-[#003893] px-5 pt-14 pb-5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-white/80">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div>
            <h1 className="text-white text-lg font-semibold">Rate your lawyer</h1>
            <p className="text-white/55 text-xs mt-0.5">Adv. Priya Shrestha · Property Law</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 pb-6">
        {/* Restriction note */}
        <div className="flex items-start gap-2.5 bg-[#E8EEF9] border border-[#003893]/15 rounded-xl px-4 py-3">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="text-[#003893] flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className="text-xs text-[#003893] font-medium leading-snug">Only completed consultations can be rated.</p>
        </div>

        {/* Lawyer card */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-3" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
          <div className="w-12 h-12 rounded-full bg-[#E8EEF9] flex items-center justify-center text-[#003893] font-bold flex-shrink-0">PS</div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-[#1A1A1A]">Adv. Priya Shrestha</p>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#003893" />
                <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-xs text-[#667085] mt-0.5">Civil Law · Property Boundary Dispute</p>
            <p className="text-[11px] text-[#98A2B3] mt-0.5">Closed Jul 28, 2026 · 21 days</p>
          </div>
        </div>

        {/* Overall rating */}
        <div className="bg-white rounded-2xl p-5 flex flex-col items-center gap-3" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
          <p className="text-sm font-semibold text-[#1A1A1A]">Overall rating</p>
          <StarInput value={overall} onChange={setOverall} size={38} />
          {overall > 0 && (
            <p className="text-sm font-medium text-[#F79009] animate-fade-in">{OVERALL_LABELS[overall]}</p>
          )}
          {overall === 0 && <p className="text-xs text-[#98A2B3]">Tap a star to rate</p>}
        </div>

        {/* Category ratings */}
        <div className="bg-white rounded-2xl p-4 flex flex-col gap-4" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
          <p className="text-sm font-semibold text-[#1A1A1A]">Rate by category <span className="text-[#98A2B3] font-normal text-xs">(optional)</span></p>
          {CATEGORIES.map((cat) => (
            <div key={cat} className="flex items-center justify-between gap-3">
              <p className="text-sm text-[#344054] w-36 flex-shrink-0">{cat}</p>
              <StarInput value={cats[cat] ?? 0} onChange={(v) => setCats((p) => ({ ...p, [cat]: v }))} size={22} />
            </div>
          ))}
        </div>

        {/* Written review */}
        <div className="bg-white rounded-2xl p-4 flex flex-col gap-2" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#1A1A1A]">Written review <span className="text-[#98A2B3] font-normal text-xs">(optional)</span></p>
            <span className="text-xs text-[#98A2B3]">{review.length}/500</span>
          </div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value.slice(0, 500))}
            placeholder="Share details about your experience — what went well, what could be improved…"
            rows={5}
            className="w-full rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#98A2B3] resize-none focus:outline-none focus:ring-2 focus:ring-[#003893]/30 focus:border-[#003893] transition leading-relaxed"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex-shrink-0 px-4 py-4 bg-white border-t border-[#F2F4F7]" style={{ boxShadow: "0 -4px 16px rgba(0,0,0,0.06)" }}>
        <button onClick={handleSubmit} disabled={!overall}
          className={`w-full rounded-xl py-3.5 text-sm font-semibold transition ${overall ? "bg-[#003893] text-white active:opacity-90" : "bg-[#F2F4F7] text-[#98A2B3]"}`}
          style={overall ? { boxShadow: "0 4px 16px rgba(0,56,147,0.28)" } : {}}>
          Submit review
        </button>
      </div>
    </div>
  );
}
