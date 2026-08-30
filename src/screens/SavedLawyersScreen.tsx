import { useState } from "react";

const INITIAL_SAVED = [
  { id: 1, name: "Adv. Sunita Maharjan", spec: "Labour Law", level: "Expert", rating: 4.9, reviews: 142, location: "Kathmandu", initials: "SM", available: true },
  { id: 2, name: "Adv. Priya Shrestha", spec: "Civil Law", level: "Expert", rating: 4.8, reviews: 211, location: "Lalitpur", initials: "PS", available: false },
  { id: 3, name: "Adv. Bikram Rai", spec: "Criminal Law", level: "Pro", rating: 4.7, reviews: 98, location: "Pokhara", initials: "BR", available: true },
];

const LEVEL_STYLES: Record<string, string> = {
  Intermediate: "bg-[#F2F4F7] text-[#667085]",
  Mediate: "bg-[#EEF4FF] text-[#3538CD]",
  Pro: "bg-[#E8EEF9] text-[#003893]",
  Expert: "bg-[#FFF9E6] text-[#B54708]",
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? "#F79009" : "#E4E7EC"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function SavedLawyersScreen({ onBack, onViewProfile }: { onBack: () => void; onViewProfile: () => void }) {
  const [saved, setSaved] = useState(INITIAL_SAVED);
  const [removing, setRemoving] = useState<number | null>(null);

  const remove = (id: number) => {
    setRemoving(id);
    setTimeout(() => {
      setSaved((prev) => prev.filter((l) => l.id !== id));
      setRemoving(null);
    }, 250);
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
            <h1 className="text-white text-lg font-semibold">Saved Lawyers</h1>
            <p className="text-white/55 text-xs mt-0.5">{saved.length} saved</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 pb-6">
        {saved.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke="#D0D5DD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-[#344054] font-semibold text-base">No saved lawyers yet</p>
              <p className="text-sm text-[#667085] mt-1 leading-relaxed max-w-[220px]">
                Tap the bookmark icon on a lawyer's profile to save them here.
              </p>
            </div>
            <button onClick={onBack}
              className="mt-2 px-6 py-3 rounded-xl bg-[#003893] text-white text-sm font-semibold active:opacity-90 transition">
              Browse lawyers
            </button>
          </div>
        ) : (
          saved.map((l) => (
            <div key={l.id}
              className={`bg-white rounded-2xl p-4 transition-all duration-200 ${removing === l.id ? "opacity-0 scale-95" : "opacity-100"}`}
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#E8EEF9] flex items-center justify-center text-[#003893] font-bold text-base">
                    {l.initials}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${l.available ? "bg-[#12B76A]" : "bg-[#D0D5DD]"}`} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-[#1A1A1A] truncate">{l.name}</p>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                      <circle cx="12" cy="12" r="10" fill="#003893" />
                      <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-xs text-[#667085] mt-0.5">{l.spec} · {l.location}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Stars rating={l.rating} />
                    <span className="text-xs font-medium text-[#1A1A1A]">{l.rating}</span>
                    <span className="text-xs text-[#98A2B3]">({l.reviews})</span>
                    <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${LEVEL_STYLES[l.level]}`}>{l.level}</span>
                  </div>
                </div>

                {/* Remove */}
                <button onClick={() => remove(l.id)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#98A2B3] hover:bg-[#FFF1F3] hover:text-[#C4320A] transition flex-shrink-0">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" fill="currentColor" />
                  </svg>
                </button>
              </div>

              <div className="mt-3 pt-3 border-t border-[#F2F4F7] flex gap-2">
                <button onClick={() => remove(l.id)}
                  className="flex-1 py-2.5 rounded-xl border border-[#E4E7EC] text-xs font-medium text-[#667085] active:bg-[#F2F4F7] transition">
                  Remove
                </button>
                <button onClick={onViewProfile}
                  className="flex-[2] py-2.5 rounded-xl bg-[#003893] text-xs font-semibold text-white active:opacity-90 transition">
                  View profile
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
