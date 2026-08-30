import { useState } from "react";

const LEVEL_STYLES: Record<string, string> = {
  Intermediate: "bg-[#F2F4F7] text-[#667085]",
  Mediate: "bg-[#EEF4FF] text-[#3538CD]",
  Pro: "bg-[#E8EEF9] text-[#003893]",
  Expert: "bg-[#FFF9E6] text-[#B54708]",
};

type Lawyer = {
  id: number;
  name: string;
  spec: string;
  level: string;
  rating: number;
  reviews: number;
  location: string;
  languages: string[];
  experience: string;
  initials: string;
  reason: string[];
  available: boolean;
};

const LAWYERS: Lawyer[] = [
  {
    id: 1,
    name: "Adv. Sunita Maharjan",
    spec: "Labour Law",
    level: "Expert",
    rating: 4.9,
    reviews: 142,
    location: "Kathmandu",
    languages: ["Nepali", "English"],
    experience: "14 yrs",
    initials: "SM",
    available: true,
    reason: ["verified", "specialises in labour law", "speaks Nepali", "serves Bagmati Province"],
  },
  {
    id: 2,
    name: "Adv. Rajesh Adhikari",
    spec: "Labour & Employment Law",
    level: "Pro",
    rating: 4.7,
    reviews: 98,
    location: "Lalitpur",
    languages: ["Nepali"],
    experience: "9 yrs",
    initials: "RA",
    available: true,
    reason: ["verified", "handled 60+ wrongful termination cases", "speaks Nepali", "serves your area"],
  },
  {
    id: 3,
    name: "Adv. Priya Shrestha",
    spec: "Civil & Labour Law",
    level: "Expert",
    rating: 4.8,
    reviews: 211,
    location: "Kathmandu",
    languages: ["Nepali", "English"],
    experience: "17 yrs",
    initials: "PS",
    available: false,
    reason: ["verified", "top-rated labour specialist", "English & Nepali", "serves Bagmati Province"],
  },
  {
    id: 4,
    name: "Adv. Bikram Rai",
    spec: "Labour Law",
    level: "Mediate",
    rating: 4.5,
    reviews: 57,
    location: "Bhaktapur",
    languages: ["Nepali", "English"],
    experience: "6 yrs",
    initials: "BR",
    available: true,
    reason: ["verified", "labour law", "speaks Nepali & English", "serves Bagmati Province"],
  },
  {
    id: 5,
    name: "Adv. Kamala Thapa",
    spec: "Employment Law",
    level: "Pro",
    rating: 4.6,
    reviews: 83,
    location: "Kathmandu",
    languages: ["Nepali"],
    experience: "11 yrs",
    initials: "KT",
    available: true,
    reason: ["verified", "employment disputes specialist", "speaks Nepali", "serves your area"],
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? "#F79009" : "#E4E7EC"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReasonTag({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#027A48] bg-[#ECFDF3] px-2 py-0.5 rounded-full">
      <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="#027A48" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {text}
    </span>
  );
}

export default function RecommendationsScreen({
  onBack,
  onViewProfile,
}: {
  onBack: () => void;
  onViewProfile?: () => void;
}) {
  const [dismissed, setDismissed] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);

  const visible = LAWYERS.filter((l) => !dismissed.includes(l.id));
  const displayed = showAll ? visible : visible.slice(0, 3);

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7]">
      {/* Header */}
      <div className="bg-[#003893] px-5 pt-14 pb-5 flex-shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} className="text-white/80">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div>
            <h1 className="text-white text-lg font-semibold">Recommended Lawyers</h1>
            <p className="text-white/55 text-xs mt-0.5">Matched to your case · Labour Law</p>
          </div>
        </div>

        {/* Match summary pill */}
        <div className="flex items-center gap-2 bg-white/12 rounded-xl px-4 py-2.5">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="text-white/70 flex-shrink-0">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-white/80 text-xs font-medium">
            {visible.length} lawyer{visible.length !== 1 ? "s" : ""} matched your case — wrongful termination, Bagmati
          </p>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 pb-6">
        {displayed.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <p className="text-[#667085] text-sm">All recommendations dismissed.</p>
            <button onClick={() => setDismissed([])} className="text-sm font-semibold text-[#003893]">Reset</button>
          </div>
        )}

        {displayed.map((lawyer) => (
          <div key={lawyer.id} className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
            {/* Card body */}
            <div className="p-4">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#E8EEF9] flex items-center justify-center text-[#003893] font-bold text-base">
                    {lawyer.initials}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${lawyer.available ? "bg-[#12B76A]" : "bg-[#D0D5DD]"}`} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="text-sm font-semibold text-[#1A1A1A]">{lawyer.name}</p>
                    {/* Verified badge */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                      <circle cx="12" cy="12" r="10" fill="#003893" />
                      <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[10px] text-[#667085]">Verified Lawyer</span>
                  </div>
                  <p className="text-xs text-[#667085] mt-0.5">{lawyer.spec} · {lawyer.experience}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Stars rating={lawyer.rating} />
                    <span className="text-xs font-medium text-[#1A1A1A]">{lawyer.rating}</span>
                    <span className="text-xs text-[#98A2B3]">({lawyer.reviews})</span>
                  </div>
                </div>

                {/* Level */}
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${LEVEL_STYLES[lawyer.level]}`}>
                  {lawyer.level}
                </span>
              </div>

              {/* Location + language */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 text-[11px] text-[#667085]">
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" /></svg>
                  {lawyer.location}
                </div>
                <div className="flex gap-1">
                  {lawyer.languages.map((l) => (
                    <span key={l} className="text-[10px] bg-[#F2F4F7] text-[#667085] px-2 py-0.5 rounded-full">{l}</span>
                  ))}
                </div>
                <span className={`ml-auto text-[11px] font-medium ${lawyer.available ? "text-[#027A48]" : "text-[#98A2B3]"}`}>
                  {lawyer.available ? "● Available" : "○ Unavailable"}
                </span>
              </div>

              {/* Reason tags */}
              <div className="mt-3 pt-3 border-t border-[#F2F4F7]">
                <p className="text-[10px] text-[#98A2B3] font-medium mb-1.5 uppercase tracking-wide">Recommended because</p>
                <div className="flex flex-wrap gap-1.5">
                  {lawyer.reason.map((r) => <ReasonTag key={r} text={r} />)}
                </div>
              </div>
            </div>

            {/* Action row */}
            <div className="flex border-t border-[#F2F4F7]">
              <button onClick={() => setDismissed((p) => [...p, lawyer.id])}
                className="flex-1 py-3 text-xs font-medium text-[#667085] border-r border-[#F2F4F7] active:bg-[#F9FAFB] transition">
                Dismiss
              </button>
              <button onClick={onViewProfile}
                className="flex-[2] py-3 text-xs font-semibold text-[#003893] active:bg-[#E8EEF9] transition">
                View profile
              </button>
            </div>
          </div>
        ))}

        {/* Show other lawyers */}
        {visible.length > 3 && (
          <button onClick={() => setShowAll(!showAll)}
            className="w-full py-3.5 rounded-xl border-2 border-dashed border-[#D0D5DD] text-sm font-medium text-[#667085] active:bg-white transition flex items-center justify-center gap-2">
            {showAll
              ? <><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> Show fewer</>
              : <><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> Show other lawyers ({visible.length - 3} more)</>
            }
          </button>
        )}

        {/* No prices note */}
        <p className="text-center text-[11px] text-[#98A2B3] pb-2">
          Consultation details are discussed directly with your chosen lawyer.
        </p>
      </div>
    </div>
  );
}
