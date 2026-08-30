import { useState } from "react";

type LangMode = "english" | "nepali" | "side-by-side";

const ARTICLES = [
  {
    num: 17,
    title: "Right to freedom",
    titleNp: "स्वतन्त्रताको हक",
    part: 3,
    partTitle: "Fundamental Rights and Duties",
    en: `(1) No person shall be deprived of his or her personal liberty save in accordance with law.

(2) Every citizen shall have the following freedoms:

(a) Freedom of opinion and expression;

(b) Freedom to assemble peaceably and without arms;

(c) Freedom to form political parties;

(d) Freedom to form unions and associations;

(e) Freedom to move and reside in any part of Nepal;

(f) Freedom to engage in any occupation or industry.

(3) The state shall not restrict the freedoms referred to in clause (2) except by a law which imposes reasonable restrictions in the public interest.`,
    np: `(१) कुनै पनि व्यक्तिलाई कानून बमोजिम बाहेक व्यक्तिगत स्वतन्त्रताबाट वञ्चित गरिने छैन।

(२) प्रत्येक नागरिकलाई देहायका स्वतन्त्रताहरू हुनेछन्:

(क) विचार र अभिव्यक्तिको स्वतन्त्रता;

(ख) हातहतियार नलिई शान्तिपूर्वक भेला हुने स्वतन्त्रता;

(ग) राजनीतिक दल गठन गर्ने स्वतन्त्रता;

(घ) संघ र संस्था खोल्ने स्वतन्त्रता;

(ङ) नेपालको कुनै पनि भागमा आवतजावत र बसोबास गर्ने स्वतन्त्रता;

(च) कुनै पनि पेशा वा उद्योगमा संलग्न हुने स्वतन्त्रता।

(३) राज्यले सार्वजनिक हितमा मनासिब बन्देज लगाउने कानूनद्वारा बाहेक खण्ड (२) मा उल्लिखित स्वतन्त्रतामा प्रतिबन्ध लगाउने छैन।`,
    explanation: "This article guarantees your personal freedom and basic civil liberties. In simple terms: the government cannot arrest or detain you without a legal reason. You also have the right to speak your mind, attend peaceful gatherings, join a party or union, live anywhere in Nepal, and choose your own work — unless a fair law exists that limits these rights for a public reason.",
  },
  {
    num: 18,
    title: "Right to equality",
    titleNp: "समानताको हक",
    part: 3,
    partTitle: "Fundamental Rights and Duties",
    en: `(1) All citizens shall be equal before the law. No person shall be denied the equal protection of the laws.

(2) No discrimination shall be made against any citizen in the application of general laws on grounds of origin, religion, race, caste, tribe, sex, economic condition, language or region, ideological conviction or any of such other grounds.

(3) The state shall not discriminate among citizens on grounds of origin, religion, race, caste, tribe, sex, economic condition, language or region, ideological conviction or any of such other grounds in regard to economic and social rights.`,
    np: `(१) सबै नागरिक कानूनका दृष्टिमा समान हुनेछन्। कुनै पनि व्यक्तिलाई कानूनको समान संरक्षणबाट वञ्चित गरिने छैन।

(२) सामान्य कानूनको प्रयोगमा मूल, धर्म, वर्ण, जात, जाति, लिङ्ग, आर्थिक अवस्था, भाषा वा क्षेत्र, वैचारिक आस्था वा यस्तै अन्य कुनै आधारमा कुनै पनि नागरिकप्रति भेदभाव गरिने छैन।

(३) राज्यले आर्थिक तथा सामाजिक अधिकारसम्बन्धमा मूल, धर्म, वर्ण, जात, जाति, लिङ्ग, आर्थिक अवस्था, भाषा वा क्षेत्र, वैचारिक आस्था वा यस्तै अन्य कुनै आधारमा नागरिकहरूबीच भेदभाव गर्ने छैन।`,
    explanation: "Everyone is equal under the law — the government must treat all citizens the same. Nobody can be discriminated against because of where they come from, their religion, caste, sex, language, or financial situation. This applies to both how laws are enforced and how social and economic rights are given.",
  },
  {
    num: 20,
    title: "Rights regarding justice",
    titleNp: "न्यायसम्बन्धी हक",
    part: 3,
    partTitle: "Fundamental Rights and Duties",
    en: `(1) No person shall be detained in custody without being informed of the grounds for such detention.

(2) Information about the detention of a person shall be given to his or her family or the person appointed by him or her as early as possible.

(3) A person who is arrested shall have the right to consult and be defended by a legal practitioner of his or her choice, and the state shall provide free legal aid to persons unable to afford such services, as provided for by law.

(4) Every person who is arrested and detained in custody shall be produced before the relevant judicial authority within forty-eight hours of such arrest, excluding the time taken for travel.`,
    np: `(१) कुनै पनि व्यक्तिलाई थुनामा राख्नुको कारण नजनाई थुनामा राखिने छैन।

(२) कुनै व्यक्ति थुनामा परेको जानकारी निज वा निजले तोकेको व्यक्तिलाई यथासम्भव छिटो दिइनेछ।

(३) पक्राउ गरिएको व्यक्तिलाई आफूले रोजेको कानून व्यवसायीसँग परामर्श गर्न र निजबाट प्रतिरक्षण गराउन पाउने हक हुनेछ र कानून बमोजिम आफ्नो बचाउका लागि सक्षम नभएका व्यक्तिहरूलाई राज्यले नि:शुल्क कानूनी सहायता उपलब्ध गराउनेछ।

(४) पक्राउ गरी थुनामा राखिएको प्रत्येक व्यक्तिलाई यात्रामा लाग्ने समय बाहेक अड्चालीस घन्टाभित्र सम्बद्ध न्यायिक निकाय समक्ष उपस्थित गराइनेछ।`,
    explanation: "If you are arrested, you have important rights: you must be told why you are being held, your family must be notified as soon as possible, you have the right to a lawyer of your choice (and the government must provide a free lawyer if you can't afford one), and you must be brought before a judge within 48 hours.",
  },
];

export default function ArticleScreen({ onBack, initialIndex = 0 }: { onBack: () => void; initialIndex?: number }) {
  const [idx, setIdx] = useState(initialIndex);
  const [lang, setLang] = useState<LangMode>("english");
  const [bookmarked, setBookmarked] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");

  const article = ARTICLES[idx];

  const FONT = { sm: "text-xs", base: "text-sm", lg: "text-base" };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-[#003893] px-5 pt-14 pb-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="text-white/80">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className="flex items-center gap-2">
            {/* Font size */}
            <div className="flex bg-white/12 rounded-lg overflow-hidden">
              {(["sm", "base", "lg"] as const).map((s, i) => (
                <button key={s} onClick={() => setFontSize(s)}
                  className={`px-2.5 py-1.5 transition ${fontSize === s ? "bg-white/25 text-white" : "text-white/50"}`}
                  style={{ fontSize: i === 0 ? 10 : i === 1 ? 13 : 16, fontWeight: 600 }}>A</button>
              ))}
            </div>
            {/* Highlight */}
            <button onClick={() => setHighlighted(!highlighted)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${highlighted ? "bg-[#FFF9E6]" : "bg-white/12"}`}>
              <svg width="15" height="15" fill={highlighted ? "#B54708" : "none"} viewBox="0 0 24 24">
                <path d="M12 20h9" stroke={highlighted ? "#B54708" : "#fff"} strokeWidth="2" strokeLinecap="round" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke={highlighted ? "#B54708" : "#fff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={highlighted ? "#FFF9E6" : "none"} />
              </svg>
            </button>
            {/* Bookmark */}
            <button onClick={() => setBookmarked(!bookmarked)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${bookmarked ? "bg-white/25" : "bg-white/12"}`}>
              <svg width="14" height="14" fill={bookmarked ? "#fff" : "none"} viewBox="0 0 24 24">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Language toggle */}
        <div className="flex bg-white/12 rounded-xl p-0.5">
          {([["english", "English"], ["nepali", "नेपाली"], ["side-by-side", "Both"]] as [LangMode, string][]).map(([l, label]) => (
            <button key={l} onClick={() => setLang(l)}
              className={`flex-1 py-2 text-xs font-semibold rounded-[10px] transition ${lang === l ? "bg-white text-[#003893]" : "text-white/65"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Article header */}
      <div className="px-5 pt-5 pb-3 border-b border-[#F2F4F7] flex-shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-[#003893] bg-[#E8EEF9] px-2.5 py-1 rounded-full">Article {article.num}</span>
              <span className="text-[11px] text-[#98A2B3]">Part {article.part}</span>
            </div>
            {(lang === "english" || lang === "side-by-side") && (
              <h2 className="text-base font-semibold text-[#1A1A1A] leading-snug">{article.title}</h2>
            )}
            {(lang === "nepali" || lang === "side-by-side") && (
              <h2 className={`font-semibold text-[#1A1A1A] leading-snug ${lang === "side-by-side" ? "text-sm text-[#667085]" : "text-base"}`}
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{article.titleNp}</h2>
            )}
            <p className="text-[11px] text-[#98A2B3] mt-1">{article.partTitle}</p>
          </div>
          {bookmarked && (
            <svg width="18" height="18" fill="#003893" viewBox="0 0 24 24" className="flex-shrink-0 mt-1">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </div>
      </div>

      {/* Article body */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {lang === "side-by-side" ? (
          <div className="grid grid-cols-2 gap-3">
            <div className={`${FONT[fontSize]} text-[#1A1A1A] leading-relaxed whitespace-pre-line ${highlighted ? "bg-[#FFFBEB] rounded-xl p-3" : ""}`}>{article.en}</div>
            <div className={`${FONT[fontSize]} text-[#344054] leading-relaxed whitespace-pre-line ${highlighted ? "bg-[#FFFBEB] rounded-xl p-3" : ""}`}
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{article.np}</div>
          </div>
        ) : lang === "english" ? (
          <p className={`${FONT[fontSize]} text-[#1A1A1A] leading-relaxed whitespace-pre-line ${highlighted ? "bg-[#FFFBEB] rounded-xl p-4" : ""}`}>{article.en}</p>
        ) : (
          <p className={`${FONT[fontSize]} text-[#1A1A1A] leading-relaxed whitespace-pre-line ${highlighted ? "bg-[#FFFBEB] rounded-xl p-4" : ""}`}
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{article.np}</p>
        )}

        {/* Explain simply section — visually separated from official text */}
        {showExplain && (
          <div className="mt-6 rounded-2xl border-2 border-dashed border-[#003893]/20 bg-[#F8FAFF] p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-[#003893] flex items-center justify-center">
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
                  <path d="M12 8v4M12 16h.01" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-xs font-bold text-[#003893] uppercase tracking-wide">Plain language explanation</p>
              <span className="ml-auto text-[10px] font-medium text-[#98A2B3] bg-[#F2F4F7] px-2 py-0.5 rounded-full">AI-generated · not official</span>
            </div>
            <p className="text-sm text-[#344054] leading-relaxed">{article.explanation}</p>
          </div>
        )}

        <div className="h-6" />
      </div>

      {/* Bottom bar */}
      <div className="flex-shrink-0 bg-white border-t border-[#F2F4F7]" style={{ boxShadow: "0 -4px 16px rgba(0,0,0,0.06)" }}>
        {/* Explain simply — visually separated above the nav */}
        <div className="px-4 pt-3 pb-2">
          <button onClick={() => setShowExplain(!showExplain)}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-semibold transition ${showExplain ? "border-[#003893] bg-[#E8EEF9] text-[#003893]" : "border-[#E4E7EC] text-[#344054]"}`}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {showExplain ? "Hide plain explanation" : "Explain simply"}
          </button>
        </div>

        {/* Prev / Next */}
        <div className="flex items-center px-4 pb-5 gap-3">
          <button onClick={() => { setIdx(Math.max(0, idx - 1)); setShowExplain(false); }}
            disabled={idx === 0}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition ${idx === 0 ? "text-[#D0D5DD] bg-[#F9FAFB]" : "text-[#344054] bg-[#F2F4F7] active:bg-[#E4E7EC]"}`}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Previous
          </button>
          <span className="text-xs text-[#98A2B3] font-medium">{idx + 1} / {ARTICLES.length}</span>
          <button onClick={() => { setIdx(Math.min(ARTICLES.length - 1, idx + 1)); setShowExplain(false); }}
            disabled={idx === ARTICLES.length - 1}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition ${idx === ARTICLES.length - 1 ? "text-[#D0D5DD] bg-[#F9FAFB]" : "text-[#344054] bg-[#F2F4F7] active:bg-[#E4E7EC]"}`}>
            Next
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
