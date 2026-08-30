import { useState } from "react";

type LangMode = "nepali" | "english" | "both";

const PARTS = [
  {
    id: 1,
    title: "Preliminary",
    titleNp: "प्रारम्भिक",
    articles: [
      { num: 1, title: "Constitution as fundamental law", titleNp: "संविधान मौलिक कानून हो" },
      { num: 2, title: "Sovereignty and state authority", titleNp: "सार्वभौमसत्ता र राज्य शक्ति" },
      { num: 3, title: "Nation", titleNp: "राष्ट्र" },
      { num: 4, title: "State of Nepal", titleNp: "नेपालको राज्य" },
    ],
  },
  {
    id: 2,
    title: "Citizenship",
    titleNp: "नागरिकता",
    articles: [
      { num: 10, title: "Right not to be deprived of citizenship", titleNp: "नागरिकताबाट वञ्चित नहुने हक" },
      { num: 11, title: "Citizenship of Nepal", titleNp: "नेपालको नागरिकता" },
      { num: 12, title: "Citizenship by descent", titleNp: "वंशज द्वारा नागरिकता" },
      { num: 13, title: "Citizenship by birth", titleNp: "जन्मद्वारा नागरिकता" },
    ],
  },
  {
    id: 3,
    title: "Fundamental Rights and Duties",
    titleNp: "मौलिक हक र कर्तव्य",
    articles: [
      { num: 16, title: "Right to live with dignity", titleNp: "सम्मानपूर्वक बाँच्न पाउने हक" },
      { num: 17, title: "Right to freedom", titleNp: "स्वतन्त्रताको हक" },
      { num: 18, title: "Right to equality", titleNp: "समानताको हक" },
      { num: 19, title: "Right to communication", titleNp: "सञ्चारको हक" },
      { num: 20, title: "Rights regarding justice", titleNp: "न्यायसम्बन्धी हक" },
      { num: 21, title: "Right of victim of crime", titleNp: "अपराधको पीडितको हक" },
      { num: 22, title: "Right against torture", titleNp: "यातनाविरुद्धको हक" },
      { num: 29, title: "Right against exploitation", titleNp: "शोषणविरुद्धको हक" },
      { num: 30, title: "Right to clean environment", titleNp: "स्वच्छ वातावरणको हक" },
    ],
  },
  {
    id: 4,
    title: "Directive Principles",
    titleNp: "राज्यका निर्देशक सिद्धान्त",
    articles: [
      { num: 50, title: "Directive principles of the state", titleNp: "राज्यका निर्देशक सिद्धान्त" },
      { num: 51, title: "State policies", titleNp: "राज्यका नीतिहरू" },
    ],
  },
  {
    id: 5,
    title: "State Structure and Distribution of State Power",
    titleNp: "राज्यको संरचना र शक्ति बाँडफाँड",
    articles: [
      { num: 56, title: "Structure of Nepal", titleNp: "नेपालको संरचना" },
      { num: 57, title: "Distribution of state power", titleNp: "राज्य शक्तिको बाँडफाँड" },
      { num: 58, title: "Residual power", titleNp: "अवशिष्ट अधिकार" },
    ],
  },
  {
    id: 6,
    title: "Federal Legislature",
    titleNp: "संघीय व्यवस्थापिका",
    articles: [
      { num: 83, title: "Federal Parliament", titleNp: "संघीय संसद" },
      { num: 84, title: "House of Representatives", titleNp: "प्रतिनिधि सभा" },
      { num: 86, title: "National Assembly", titleNp: "राष्ट्रिय सभा" },
    ],
  },
];

const FONT_SIZES = ["sm", "base", "lg"] as const;
const FONT_SIZE_LABELS = { sm: "A", base: "A", lg: "A" };
const FONT_SIZE_CLASSES = { sm: "text-xs", base: "text-sm", lg: "text-base" };

export default function ConstitutionScreen({ onOpenArticle }: { onOpenArticle?: () => void }) {
  const [langMode, setLangMode] = useState<LangMode>("english");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number[]>([3]);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [dark, setDark] = useState(false);

  const toggle = (id: number) =>
    setExpanded((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const filtered = PARTS.map((p) => ({
    ...p,
    articles: p.articles.filter((a) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.titleNp.includes(q) ||
        String(a.num).includes(q)
      );
    }),
  })).filter((p) => !search || p.articles.length > 0);

  const bg = dark ? "bg-[#0F1117]" : "bg-[#F2F4F7]";
  const cardBg = dark ? "bg-[#1A1D27]" : "bg-white";
  const headerBg = dark ? "bg-[#111827]" : "bg-[#003893]";
  const textPrimary = dark ? "text-[#F9FAFB]" : "text-[#1A1A1A]";
  const textSecondary = dark ? "text-[#9CA3AF]" : "text-[#667085]";
  const divider = dark ? "border-[#2D3147]" : "border-[#F2F4F7]";
  const inputBg = dark ? "bg-[#1A1D27] border-[#2D3147] text-[#F9FAFB] placeholder:text-[#4B5563]" : "bg-white border-[#E4E7EC] text-[#1A1A1A] placeholder:text-[#98A2B3]";

  return (
    <div className={`flex flex-col h-full ${bg} transition-colors duration-200`}>
      {/* Header */}
      <div className={`${headerBg} px-5 pt-14 pb-4`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-lg font-semibold">Constitution</h1>
            <p className="text-white/60 text-xs mt-0.5" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              नेपालको संविधान २०७२
            </p>
          </div>
          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Font size */}
            <div className="flex items-center bg-white/15 rounded-lg overflow-hidden">
              {FONT_SIZES.map((s, i) => (
                <button key={s} onClick={() => setFontSize(s)}
                  className={`px-2 py-1.5 transition ${fontSize === s ? "bg-white/25 text-white" : "text-white/60"}`}
                  style={{ fontSize: i === 0 ? 10 : i === 1 ? 13 : 16, fontWeight: 600 }}>
                  {FONT_SIZE_LABELS[s]}
                </button>
              ))}
            </div>
            {/* Dark mode */}
            <button onClick={() => setDark(!dark)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${dark ? "bg-yellow-400" : "bg-white/15"}`}>
              {dark
                ? <svg width="14" height="14" fill="#1A1A1A" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" /></svg>
                : <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              }
            </button>
          </div>
        </div>

        {/* Language toggle */}
        <div className="mt-3 flex bg-white/15 rounded-xl p-0.5 gap-0.5">
          {(["english", "nepali", "both"] as LangMode[]).map((l) => (
            <button key={l} onClick={() => setLangMode(l)}
              className={`flex-1 py-2 text-xs font-medium rounded-[10px] transition ${langMode === l ? "bg-white text-[#003893]" : "text-white/70"}`}>
              {l === "english" ? "English" : l === "nepali" ? "नेपाली" : "Both"}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <svg className={`absolute left-3 top-1/2 -translate-y-1/2 ${dark ? "text-[#4B5563]" : "text-[#98A2B3]"}`} width="15" height="15" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#003893]/30 focus:border-[#003893] transition ${inputBg}`}
          />
        </div>
      </div>

      {/* TOC */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 flex flex-col gap-2">
        {filtered.map((part) => {
          const isOpen = expanded.includes(part.id) || !!search;
          return (
            <div key={part.id} className={`rounded-2xl overflow-hidden ${cardBg}`} style={{ boxShadow: dark ? "none" : "0 1px 4px rgba(0,0,0,0.07)" }}>
              {/* Part header */}
              <button onClick={() => toggle(part.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 text-left ${divider}`}>
                <div>
                  <p className={`text-[11px] font-medium mb-0.5 ${textSecondary}`}>Part {part.id}</p>
                  {(langMode === "english" || langMode === "both") && (
                    <p className={`text-sm font-semibold ${textPrimary} ${FONT_SIZE_CLASSES[fontSize]}`}>{part.title}</p>
                  )}
                  {(langMode === "nepali" || langMode === "both") && (
                    <p className={`font-semibold ${textPrimary} ${FONT_SIZE_CLASSES[fontSize]}`} style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{part.titleNp}</p>
                  )}
                </div>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
                  className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${textSecondary}`}>
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Articles */}
              {isOpen && (
                <div className={`border-t ${divider}`}>
                  {part.articles.map((a, i) => (
                    <div key={a.num}>
                      <button onClick={onOpenArticle} className={`w-full flex items-center gap-3 px-4 py-3 text-left active:bg-[#F9FAFB] transition`}>
                        <span className={`text-xs font-bold w-8 flex-shrink-0 ${dark ? "text-[#003893]" : "text-[#003893]"} opacity-80`}>
                          {a.num}
                        </span>
                        <div className="flex-1 min-w-0">
                          {(langMode === "english" || langMode === "both") && (
                            <p className={`${FONT_SIZE_CLASSES[fontSize]} ${textPrimary} leading-snug`}>{a.title}</p>
                          )}
                          {(langMode === "nepali" || langMode === "both") && (
                            <p className={`${FONT_SIZE_CLASSES[fontSize]} ${langMode === "both" ? textSecondary : textPrimary} leading-snug`}
                              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{a.titleNp}</p>
                          )}
                        </div>
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className={`flex-shrink-0 ${textSecondary}`}>
                          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      {i < part.articles.length - 1 && <div className={`h-px ${dark ? "bg-[#2D3147]" : "bg-[#F2F4F7]"} ml-14`} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <p className={`text-sm ${textSecondary}`}>No articles found for "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
