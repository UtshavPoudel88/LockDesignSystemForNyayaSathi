import { useState } from "react";

const TABS = ["About", "Experience", "Specializations", "Languages", "Reviews"] as const;
type Tab = typeof TABS[number];

const REVIEWS = [
  { id: 1, name: "Ramesh S.", rating: 5, date: "Aug 2026", text: "Extremely knowledgeable. She explained the Labour Act provisions clearly and helped me recover my dues." },
  { id: 2, name: "Anita K.", rating: 5, date: "Jul 2026", text: "Very professional and responsive. My case was resolved within 3 weeks thanks to her guidance." },
  { id: 3, name: "Bikash T.", rating: 4, date: "Jun 2026", text: "Good understanding of employment law. Communication could be slightly faster but overall excellent." },
  { id: 4, name: "Sita G.", rating: 5, date: "May 2026", text: "She listened carefully and gave me clear steps to take. I felt supported throughout the process." },
];

function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= rating ? "#F79009" : "#E4E7EC"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function LawyerProfileScreen({
  onBack,
  onRequestConsultation,
}: {
  onBack: () => void;
  onRequestConsultation: () => void;
}) {
  const [tab, setTab] = useState<Tab>("About");
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7]">
      {/* Hero */}
      <div className="bg-[#003893] px-5 pt-14 pb-5 flex-shrink-0">
        <div className="flex items-center justify-between mb-5">
          <button onClick={onBack} className="text-white/80 w-8 h-8 flex items-center justify-center">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button onClick={() => setSaved(!saved)}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition ${saved ? "bg-white/20" : ""}`}>
            <svg width="20" height="20" fill={saved ? "#fff" : "none"} viewBox="0 0 24 24">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="flex gap-4 items-start">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-white/20 border-2 border-white/25 flex items-center justify-center text-white font-bold text-2xl">
              SM
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#12B76A] border-2 border-[#003893]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-white text-lg font-semibold leading-tight">Adv. Sunita Maharjan</h1>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#fff" fillOpacity=".2" />
                <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="1.5" />
                <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-white/65 text-xs mt-0.5">Labour & Employment Law · 14 yrs exp.</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1.5">
                <Stars rating={5} size={11} />
                <span className="text-white text-xs font-semibold">4.9</span>
                <span className="text-white/50 text-xs">(142 reviews)</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FFF9E6] text-[#B54708]">Expert</span>
              <span className="text-[11px] text-white/60 flex items-center gap-1">
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" stroke="currentColor" strokeWidth="2.5" /><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2.5" /></svg>
                Kathmandu
              </span>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="mt-4 flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2.5">
          <div className="w-2 h-2 rounded-full bg-[#12B76A] flex-shrink-0" />
          <p className="text-white/80 text-xs font-medium">Available for new consultations</p>
          <span className="ml-auto text-white/50 text-[11px]">Responds within 2 hrs</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-[#F2F4F7] flex-shrink-0" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <div className="flex overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-shrink-0 px-4 py-3.5 text-xs font-semibold relative transition ${tab === t ? "text-[#003893]" : "text-[#667085]"}`}>
              {t}
              {tab === t && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003893] rounded-t-full" />}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {tab === "About" && (
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <p className="text-xs font-semibold text-[#667085] uppercase tracking-wide mb-2">About</p>
              <p className="text-sm text-[#1A1A1A] leading-relaxed">
                Adv. Sunita Maharjan is a senior advocate with over 14 years of experience in labour and employment law in Nepal. She has represented both individual workers and organisations before the Labour Office, Labour Court, and Supreme Court.
              </p>
              <p className="text-sm text-[#667085] mt-2 leading-relaxed">
                She is known for her thorough case preparation and clear communication with clients throughout proceedings.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Cases handled", value: "340+" },
                { label: "Cases won", value: "89%" },
                { label: "Avg. response", value: "< 2 hrs" },
                { label: "Member since", value: "2012" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-4 text-center" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                  <p className="text-xl font-bold text-[#003893]">{s.value}</p>
                  <p className="text-[11px] text-[#667085] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <p className="text-xs font-semibold text-[#667085] uppercase tracking-wide mb-3">Bar Council Registration</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8EEF9] flex items-center justify-center">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#003893" strokeWidth="2" /><path d="M7 12l3 3 7-7" stroke="#003893" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A]">Nepal Bar Association</p>
                  <p className="text-xs text-[#667085]">Reg. No. NBA-2012-04872 · Verified</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "Experience" && (
          <div className="flex flex-col gap-3">
            {[
              { role: "Senior Advocate", place: "Independent Practice, Kathmandu", period: "2018 – Present", desc: "Specialising in wrongful termination, wage disputes, and collective bargaining." },
              { role: "Associate Advocate", place: "Sharma & Associates, Kathmandu", period: "2014 – 2018", desc: "Labour disputes, employment contracts, and labour court representation." },
              { role: "Junior Advocate", place: "Nepal Legal Aid Society", period: "2010 – 2014", desc: "Pro bono labour law representation for workers in the manufacturing sector." },
            ].map((e) => (
              <div key={e.role} className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#003893] mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A]">{e.role}</p>
                    <p className="text-xs text-[#003893] font-medium mt-0.5">{e.place}</p>
                    <p className="text-xs text-[#98A2B3] mt-0.5">{e.period}</p>
                    <p className="text-xs text-[#667085] mt-1.5 leading-relaxed">{e.desc}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <p className="text-xs font-semibold text-[#667085] uppercase tracking-wide mb-3">Education</p>
              {[
                { deg: "LL.M. Labour Law", inst: "Tribhuvan University, Kathmandu", year: "2012" },
                { deg: "LL.B.", inst: "Kathmandu School of Law", year: "2010" },
              ].map((ed) => (
                <div key={ed.deg} className="flex items-start gap-3 py-2 border-b border-[#F2F4F7] last:border-0">
                  <div className="w-7 h-7 rounded-lg bg-[#E8EEF9] flex items-center justify-center flex-shrink-0">
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" stroke="#003893" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 12v5c3.33 2 8.67 2 12 0v-5" stroke="#003893" strokeWidth="2" strokeLinecap="round" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">{ed.deg}</p>
                    <p className="text-xs text-[#667085]">{ed.inst} · {ed.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Specializations" && (
          <div className="flex flex-col gap-3">
            {[
              { area: "Wrongful Termination", cases: "120+ cases", primary: true },
              { area: "Wage & Salary Disputes", cases: "80+ cases", primary: true },
              { area: "Labour Court Representation", cases: "95+ cases", primary: true },
              { area: "Employment Contracts", cases: "60+ cases", primary: false },
              { area: "Collective Bargaining", cases: "35+ cases", primary: false },
              { area: "Workplace Discrimination", cases: "28+ cases", primary: false },
              { area: "Occupational Safety", cases: "22+ cases", primary: false },
            ].map((s) => (
              <div key={s.area} className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.primary ? "bg-[#003893]" : "bg-[#D0D5DD]"}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1A1A1A]">{s.area}</p>
                  <p className="text-xs text-[#667085]">{s.cases}</p>
                </div>
                {s.primary && <span className="text-[10px] font-semibold text-[#003893] bg-[#E8EEF9] px-2.5 py-1 rounded-full">Primary</span>}
              </div>
            ))}
          </div>
        )}

        {tab === "Languages" && (
          <div className="flex flex-col gap-3">
            {[
              { lang: "Nepali", script: "नेपाली", level: "Native", pct: 100 },
              { lang: "English", script: "English", level: "Professional", pct: 90 },
              { lang: "Newari", script: "नेवारी", level: "Conversational", pct: 65 },
            ].map((l) => (
              <div key={l.lang} className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A]">{l.lang}</p>
                    <p className="text-xs text-[#667085]" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{l.script}</p>
                  </div>
                  <span className="text-xs font-medium text-[#003893] bg-[#E8EEF9] px-2.5 py-1 rounded-full">{l.level}</span>
                </div>
                <div className="h-1.5 bg-[#F2F4F7] rounded-full overflow-hidden">
                  <div className="h-full bg-[#003893] rounded-full" style={{ width: `${l.pct}%` }} />
                </div>
              </div>
            ))}
            <p className="text-xs text-[#98A2B3] text-center px-4">Court proceedings are conducted in Nepali. Written correspondence available in English upon request.</p>
          </div>
        )}

        {tab === "Reviews" && (
          <div className="flex flex-col gap-3">
            {/* Summary */}
            <div className="bg-white rounded-2xl p-4 flex items-center gap-4" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <div className="text-center">
                <p className="text-4xl font-bold text-[#1A1A1A]">4.9</p>
                <Stars rating={5} size={13} />
                <p className="text-[11px] text-[#667085] mt-1">142 reviews</p>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const pct = star === 5 ? 88 : star === 4 ? 10 : star === 3 ? 2 : 0;
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-[11px] text-[#667085] w-3">{star}</span>
                      <div className="flex-1 h-1.5 bg-[#F2F4F7] rounded-full overflow-hidden">
                        <div className="h-full bg-[#F79009] rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[11px] text-[#98A2B3] w-6 text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {REVIEWS.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#E8EEF9] flex items-center justify-center text-[#003893] text-xs font-bold">
                      {r.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1A1A1A]">{r.name}</p>
                      <p className="text-[11px] text-[#98A2B3]">{r.date}</p>
                    </div>
                  </div>
                  <Stars rating={r.rating} size={11} />
                </div>
                <p className="text-sm text-[#667085] leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        )}

        <div className="h-4" />
      </div>

      {/* Bottom actions */}
      <div className="flex-shrink-0 px-4 py-4 bg-white border-t border-[#F2F4F7]" style={{ boxShadow: "0 -4px 16px rgba(0,0,0,0.06)" }}>
        <div className="flex gap-3">
          <button onClick={() => setSaved(!saved)}
            className={`flex items-center gap-2 px-4 py-3.5 rounded-xl border-2 text-sm font-semibold transition ${saved ? "border-[#003893] bg-[#E8EEF9] text-[#003893]" : "border-[#E4E7EC] text-[#667085]"}`}>
            <svg width="16" height="16" fill={saved ? "#003893" : "none"} viewBox="0 0 24 24">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke={saved ? "#003893" : "#667085"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {saved ? "Saved" : "Save"}
          </button>
          <button onClick={onRequestConsultation}
            className="flex-1 rounded-xl bg-[#003893] py-3.5 text-sm font-semibold text-white active:opacity-90 transition"
            style={{ boxShadow: "0 4px 16px rgba(0,56,147,0.28)" }}>
            Request consultation
          </button>
        </div>
      </div>
    </div>
  );
}
