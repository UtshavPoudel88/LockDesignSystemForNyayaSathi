import { useState } from "react";

const LEVEL_COLORS: Record<string, string> = {
  Intermediate: "bg-[#F2F4F7] text-[#667085]",
  Mediate: "bg-[#EEF4FF] text-[#3538CD]",
  Pro: "bg-[#E8EEF9] text-[#003893]",
  Expert: "bg-[#FFF9E6] text-[#B54708]",
};

const LAWYERS = [
  { id: 1, name: "Adv. Sunita Maharjan", spec: "Family Law", level: "Expert", rating: 4.9, reviews: 142, location: "Kathmandu", province: "Bagmati", lang: ["Nepali", "English"], available: true, initials: "SM", experience: 14, bio: "Specialises in divorce, custody, and domestic violence cases across Bagmati Province." },
  { id: 2, name: "Adv. Bikram Rai", spec: "Criminal Law", level: "Pro", rating: 4.7, reviews: 98, location: "Pokhara", province: "Gandaki", lang: ["Nepali"], available: true, initials: "BR", experience: 9, bio: "Experienced in FIR filing, bail hearings, and criminal defence at district courts." },
  { id: 3, name: "Adv. Priya Shrestha", spec: "Civil Law", level: "Expert", rating: 4.8, reviews: 211, location: "Lalitpur", province: "Bagmati", lang: ["Nepali", "English"], available: false, initials: "PS", experience: 17, bio: "Civil litigation expert — property disputes, contract enforcement, and tenant rights." },
  { id: 4, name: "Adv. Rajesh Adhikari", spec: "Labour Law", level: "Mediate", rating: 4.5, reviews: 57, location: "Biratnagar", province: "Koshi", lang: ["Nepali", "Maithili"], available: true, initials: "RA", experience: 6, bio: "Labour Act violations, termination disputes, and workplace rights across Koshi Province." },
  { id: 5, name: "Adv. Kamala Thapa", spec: "Property Law", level: "Pro", rating: 4.6, reviews: 83, location: "Butwal", province: "Lumbini", lang: ["Nepali", "English"], available: false, initials: "KT", experience: 11, bio: "Land registration, boundary disputes, and inheritance cases in Lumbini Province." },
  { id: 6, name: "Adv. Deepak Gurung", spec: "Business Law", level: "Intermediate", rating: 4.2, reviews: 34, location: "Dharan", province: "Koshi", lang: ["Nepali", "English"], available: true, initials: "DG", experience: 3, bio: "Company registration, contracts, and business compliance for startups and SMEs." },
  { id: 7, name: "Adv. Nirmala Pokharel", spec: "Multiple Legal Areas", level: "Expert", rating: 4.8, reviews: 176, location: "Kathmandu", province: "Bagmati", lang: ["Nepali", "English"], available: true, initials: "NP", experience: 19, bio: "Senior advocate with extensive experience in civil, family, property, and constitutional matters." },
  { id: 8, name: "Adv. Santosh Basnet", spec: "Multiple Legal Areas", level: "Pro", rating: 4.6, reviews: 91, location: "Pokhara", province: "Gandaki", lang: ["Nepali", "English"], available: true, initials: "SB", experience: 12, bio: "Criminal, civil, and labour law — comprehensive legal support across all courts in Gandaki." },
  { id: 9, name: "Adv. Geeta Kumari Shah", spec: "Constitutional Law", level: "Expert", rating: 4.9, reviews: 63, location: "Kathmandu", province: "Bagmati", lang: ["Nepali", "English", "Hindi"], available: false, initials: "GS", experience: 21, bio: "Fundamental rights, writ petitions, and constitutional litigation at the Supreme Court." },
];

const SPECS = ["All", "Family", "Criminal", "Civil", "Labour", "Property", "Business", "Constitutional", "Multiple Areas"];
const PROVINCES = ["All provinces", "Bagmati", "Koshi", "Gandaki", "Lumbini", "Madhesh", "Karnali", "Sudurpashchim"];
const SORT_OPTIONS = ["Best match", "Highest rated", "Most reviewed", "Most experienced"];

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

export default function LawyersScreen({ onViewProfile, onViewSaved }: { onViewProfile?: () => void; onViewSaved?: () => void }) {
  const [search, setSearch] = useState("");
  const [spec, setSpec] = useState("All");
  const [province, setProvince] = useState("All provinces");
  const [availNow, setAvailNow] = useState(false);
  const [sortBy, setSortBy] = useState("Best match");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = LAWYERS
    .filter((l) => {
      if (search) {
        const q = search.toLowerCase();
        if (!l.name.toLowerCase().includes(q) && !l.spec.toLowerCase().includes(q) && !l.location.toLowerCase().includes(q)) return false;
      }
      if (spec !== "All") {
        if (spec === "Multiple Areas" && l.spec !== "Multiple Legal Areas") return false;
        else if (spec !== "Multiple Areas" && !l.spec.toLowerCase().includes(spec.toLowerCase())) return false;
      }
      if (province !== "All provinces" && l.province !== province) return false;
      if (availNow && !l.available) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "Highest rated") return b.rating - a.rating;
      if (sortBy === "Most reviewed") return b.reviews - a.reviews;
      if (sortBy === "Most experienced") return b.experience - a.experience;
      return (b.available ? 1 : 0) - (a.available ? 1 : 0) || b.rating - a.rating;
    });

  const activeFilterCount = [spec !== "All", province !== "All provinces", availNow].filter(Boolean).length;

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7]">
      {/* Header */}
      <div className="bg-[#003893] px-5 pt-14 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-white text-lg font-semibold">Find a Lawyer</h1>
            <p className="text-white/60 text-xs mt-0.5">Verified advocates across Nepal</p>
          </div>
          <button onClick={onViewSaved} className="flex items-center gap-1.5 bg-white/15 border border-white/20 rounded-xl px-3 py-2">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="text-white text-xs font-medium">Saved</span>
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" width="16" height="16" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, specialization, or city..."
            className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/15 border border-white/20 text-sm text-white placeholder:text-white/50 focus:outline-none focus:bg-white/22 transition"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/60">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          )}
        </div>
      </div>

      {/* Spec filter chips */}
      <div className="bg-white border-b border-[#F2F4F7] px-4 pt-3 pb-0" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <div className="flex gap-2 overflow-x-auto pb-3" style={{ scrollbarWidth: "none" }}>
          {SPECS.map((s) => (
            <button key={s} onClick={() => setSpec(s === spec ? "All" : s)}
              className={`flex-shrink-0 text-xs font-medium px-3.5 py-2 rounded-full border transition ${spec === s ? "bg-[#003893] text-white border-[#003893]" : "bg-white text-[#667085] border-[#E4E7EC]"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Results bar + advanced filters */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between gap-2">
        <p className="text-xs text-[#667085] flex-shrink-0">
          <span className="font-semibold text-[#1A1A1A]">{filtered.length}</span> lawyer{filtered.length !== 1 ? "s" : ""} found
        </p>
        <div className="flex items-center gap-2">
          {/* Sort */}
          <div className="relative">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none text-xs font-medium text-[#003893] bg-[#E8EEF9] border-0 rounded-lg pl-2.5 pr-6 py-1.5 focus:outline-none">
              {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
            <svg className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[#003893] pointer-events-none" width="12" height="12" fill="none" viewBox="0 0 24 24">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          {/* Filter toggle */}
          <button onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition ${showFilters || activeFilterCount > 0 ? "bg-[#003893] text-white border-[#003893]" : "bg-white text-[#667085] border-[#E4E7EC]"}`}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </button>
        </div>
      </div>

      {/* Advanced filter panel */}
      {showFilters && (
        <div className="mx-4 mb-3 bg-white rounded-2xl p-4 flex flex-col gap-3" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.08)" }}>
          {/* Province */}
          <div>
            <p className="text-[11px] font-semibold text-[#667085] uppercase tracking-wide mb-2">Province</p>
            <div className="flex gap-1.5 flex-wrap">
              {PROVINCES.map((p) => (
                <button key={p} onClick={() => setProvince(p)}
                  className={`text-[11px] font-medium px-3 py-1.5 rounded-full border transition ${province === p ? "bg-[#003893] text-white border-[#003893]" : "text-[#667085] border-[#E4E7EC]"}`}>
                  {p === "All provinces" ? "All" : p}
                </button>
              ))}
            </div>
          </div>
          <div className="h-px bg-[#F2F4F7]" />
          {/* Availability */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#1A1A1A]">Available now only</p>
              <p className="text-xs text-[#667085]">Show lawyers currently accepting clients</p>
            </div>
            <button onClick={() => setAvailNow(!availNow)}
              className={`relative w-10 h-5.5 rounded-full transition-colors ${availNow ? "bg-[#003893]" : "bg-[#D0D5DD]"}`}
              style={{ height: 22, width: 40 }}>
              <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
                style={{ transform: availNow ? "translateX(18px)" : "translateX(2px)" }} />
            </button>
          </div>
          {/* Clear */}
          {activeFilterCount > 0 && (
            <button onClick={() => { setProvince("All provinces"); setAvailNow(false); setSpec("All"); }}
              className="text-xs font-medium text-[#C4320A] text-center">
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Lawyer cards */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 flex flex-col gap-3">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" className="text-[#D0D5DD]">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="text-sm text-[#667085] text-center">No lawyers match your search.<br />Try adjusting your filters.</p>
            <button onClick={() => { setSearch(""); setSpec("All"); setProvince("All provinces"); setAvailNow(false); }}
              className="text-xs font-semibold text-[#003893]">Reset all</button>
          </div>
        )}

        {filtered.map((l) => (
          <div key={l.id} className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
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
                <div className="flex items-start justify-between gap-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <p className="text-sm font-semibold text-[#1A1A1A] truncate">{l.name}</p>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                      <circle cx="12" cy="12" r="10" fill="#003893" />
                      <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${LEVEL_COLORS[l.level]}`}>{l.level}</span>
                </div>
                <p className="text-xs text-[#667085] mt-0.5">{l.spec} · {l.experience} yrs exp.</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Stars rating={l.rating} />
                  <span className="text-xs font-semibold text-[#1A1A1A]">{l.rating}</span>
                  <span className="text-xs text-[#98A2B3]">({l.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-xs text-[#667085] mt-2.5 leading-relaxed line-clamp-2">{l.bio}</p>

            {/* Tags row */}
            <div className="mt-2.5 flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1 text-[11px] text-[#667085]">
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" /></svg>
                {l.location}, {l.province}
              </div>
              <div className="flex gap-1">
                {l.lang.map((lg) => (
                  <span key={lg} className="text-[10px] bg-[#F2F4F7] text-[#667085] px-2 py-0.5 rounded-full">{lg}</span>
                ))}
              </div>
              <span className={`ml-auto text-[11px] font-medium ${l.available ? "text-[#027A48]" : "text-[#98A2B3]"}`}>
                {l.available ? "● Available" : "○ Unavailable"}
              </span>
            </div>

            {/* Actions */}
            <div className="mt-3 flex gap-2">
              <button onClick={onViewProfile}
                className="flex-1 rounded-xl border border-[#E4E7EC] py-2.5 text-xs font-semibold text-[#344054] active:bg-[#F2F4F7] transition">
                View Profile
              </button>
              <button onClick={onViewProfile}
                className={`flex-[2] rounded-xl py-2.5 text-xs font-semibold text-white transition ${l.available ? "bg-[#003893] active:opacity-90" : "bg-[#98A2B3]"}`}>
                {l.available ? "Request Consultation" : "Join Waitlist"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
