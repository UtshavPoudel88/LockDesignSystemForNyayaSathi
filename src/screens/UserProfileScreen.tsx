import { useState } from "react";

type ProfileTab = "overview" | "documents" | "settings" | "constitution";

const CONS_PARTS = [
  { id: 3, title: "Fundamental Rights and Duties", titleNp: "मौलिक हक र कर्तव्य", articles: ["Right to live with dignity (16)", "Right to freedom (17)", "Right to equality (18)", "Rights regarding justice (20)", "Right against torture (22)"] },
  { id: 1, title: "Preliminary", titleNp: "प्रारम्भिक", articles: ["Constitution as fundamental law (1)", "Sovereignty and state authority (2)", "Nation (3)"] },
  { id: 6, title: "Federal Legislature", titleNp: "संघीय व्यवस्थापिका", articles: ["Federal Parliament (83)", "House of Representatives (84)", "National Assembly (86)"] },
];

export default function UserProfileScreen({
  role,
  onSettings,
  onDocuments,
  onOpenArticle,
}: {
  role: "user" | "lawyer";
  onSettings: () => void;
  onDocuments: () => void;
  onOpenArticle: () => void;
}) {
  const [tab, setTab] = useState<ProfileTab>("overview");
  const [expandedPart, setExpandedPart] = useState<number[]>([3]);

  const isLawyer = role === "lawyer";

  const TABS: { id: ProfileTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "documents", label: "Documents" },
    { id: "constitution", label: "Constitution" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7]">
      {/* Header */}
      <div className="bg-[#003893] px-5 pt-14 pb-5 flex-shrink-0">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-white text-lg font-semibold">My Profile</h1>
          <button onClick={onSettings}
            className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white/80">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Avatar + info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-white font-bold text-xl">
              {isLawyer ? "SM" : "RS"}
            </div>
            {isLawyer && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#003893" />
                  <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
          <div>
            <p className="text-white font-semibold text-base">
              {isLawyer ? "Adv. Sunita Maharjan" : "Ramesh Kumar Sharma"}
            </p>
            <p className="text-white/60 text-xs mt-0.5">
              {isLawyer ? "Labour Law · Expert · Kathmandu" : "NyayaSathi member since 2026"}
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              {isLawyer ? (
                <>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FFF9E6] text-[#B54708]">Expert</span>
                  <span className="text-[11px] text-white/55">NBA-2012-04872</span>
                </>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#ECFDF3] bg-[#027A48]/40 px-2.5 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
                  Verified account
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-[#F2F4F7] flex-shrink-0 flex overflow-x-auto" style={{ scrollbarWidth: "none", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => { setTab(t.id); if (t.id === "settings") onSettings(); if (t.id === "documents") onDocuments(); }}
            className={`flex-shrink-0 px-5 py-3.5 text-xs font-semibold relative transition ${tab === t.id ? "text-[#003893]" : "text-[#667085]"}`}>
            {t.label}
            {tab === t.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003893] rounded-t-full" />}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 pb-6">

        {tab === "overview" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2.5">
              {(isLawyer
                ? [{ label: "Active cases", value: "8" }, { label: "Total cases", value: "340" }, { label: "Rating", value: "4.9 ★" }]
                : [{ label: "Active cases", value: "3" }, { label: "Consultations", value: "7" }, { label: "Lawyers saved", value: "3" }]
              ).map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-3.5 text-center" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                  <p className="text-xl font-bold text-[#003893]">{s.value}</p>
                  <p className="text-[10px] text-[#667085] mt-0.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Info card */}
            <div className="bg-white rounded-2xl p-4 flex flex-col gap-3" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <p className="text-xs font-semibold text-[#667085] uppercase tracking-wide">Account details</p>
              {[
                { label: "Email", value: isLawyer ? "sunita@example.com" : "ramesh@example.com" },
                { label: "Phone", value: "+977 9812345678" },
                { label: "Province", value: "Bagmati Province" },
                { label: "Language", value: "Nepali" },
                ...(isLawyer ? [
                  { label: "Bar Council No.", value: "NBA-2012-04872" },
                  { label: "Specialization", value: "Labour & Employment Law" },
                  { label: "Experience", value: "14 years" },
                ] : []),
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between border-b border-[#F2F4F7] pb-2.5 last:border-0 last:pb-0">
                  <p className="text-xs text-[#667085]">{row.label}</p>
                  <p className="text-sm font-medium text-[#1A1A1A]">{row.value}</p>
                </div>
              ))}
            </div>

            {/* Lawyer availability toggle */}
            {isLawyer && (
              <AvailabilityCard />
            )}

            {/* Quick links */}
            <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              {[
                { label: "My documents", icon: "📄", action: onDocuments },
                { label: "Nepal Constitution", icon: "📖", action: () => setTab("constitution") },
                { label: "Settings", icon: "⚙️", action: onSettings },
              ].map((item, i, arr) => (
                <div key={item.label}>
                  <button onClick={item.action} className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-[#F9FAFB] transition">
                    <span className="text-base">{item.icon}</span>
                    <p className="flex-1 text-sm font-medium text-[#1A1A1A]">{item.label}</p>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="text-[#D0D5DD]">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {i < arr.length - 1 && <div className="h-px bg-[#F2F4F7] ml-12" />}
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "constitution" && (
          <>
            <div className="bg-[#E8EEF9] border border-[#003893]/15 rounded-2xl px-4 py-3 flex items-center gap-2.5">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="text-[#003893] flex-shrink-0">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
                <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p className="text-xs text-[#003893] font-medium">Constitution of Nepal 2072 · Quick reference</p>
            </div>
            {CONS_PARTS.map((part) => {
              const open = expandedPart.includes(part.id);
              return (
                <div key={part.id} className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                  <button onClick={() => setExpandedPart((p) => open ? p.filter((x) => x !== part.id) : [...p, part.id])}
                    className="w-full flex items-center justify-between px-4 py-3.5 text-left">
                    <div>
                      <p className="text-[10px] text-[#98A2B3] font-medium mb-0.5">Part {part.id}</p>
                      <p className="text-sm font-semibold text-[#1A1A1A]">{part.title}</p>
                      <p className="text-[11px] text-[#667085]" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{part.titleNp}</p>
                    </div>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className={`flex-shrink-0 text-[#98A2B3] transition-transform ${open ? "rotate-180" : ""}`}>
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {open && (
                    <div className="border-t border-[#F2F4F7]">
                      {part.articles.map((a, i) => (
                        <div key={a}>
                          <button onClick={onOpenArticle} className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-[#F9FAFB] transition">
                            <div className="w-6 h-6 rounded-full bg-[#E8EEF9] flex items-center justify-center flex-shrink-0">
                              <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#003893" strokeWidth="2.5" /></svg>
                            </div>
                            <p className="flex-1 text-sm text-[#344054]">{a}</p>
                            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" className="text-[#D0D5DD]">
                              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                          {i < part.articles.length - 1 && <div className="h-px bg-[#F2F4F7] ml-12" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}

      </div>
    </div>
  );
}

function AvailabilityCard() {
  const [available, setAvailable] = useState(true);
  return (
    <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[#1A1A1A]">Availability status</p>
          <p className="text-xs text-[#667085] mt-0.5">{available ? "You are visible to new clients" : "Hidden from new client requests"}</p>
        </div>
        <button onClick={() => setAvailable(!available)}
          className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${available ? "bg-[#003893]" : "bg-[#D0D5DD]"}`}>
          <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200"
            style={{ transform: available ? "translateX(22px)" : "translateX(2px)" }} />
        </button>
      </div>
      <div className={`mt-3 flex items-center gap-2 rounded-xl px-3 py-2 ${available ? "bg-[#ECFDF3]" : "bg-[#F2F4F7]"}`}>
        <div className={`w-2 h-2 rounded-full ${available ? "bg-[#12B76A]" : "bg-[#D0D5DD]"}`} />
        <p className={`text-xs font-medium ${available ? "text-[#027A48]" : "text-[#667085]"}`}>
          {available ? "Available for new consultations" : "Not accepting new requests"}
        </p>
      </div>
    </div>
  );
}
