import { useState } from "react";

const PROVINCES = [
  "Koshi Province", "Madhesh Province", "Bagmati Province",
  "Gandaki Province", "Lumbini Province", "Karnali Province", "Sudurpashchim Province",
];

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${value ? "bg-[#003893]" : "bg-[#D0D5DD]"}`}>
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${value ? "translate-x-5.5" : "translate-x-0.5"}`}
        style={{ transform: value ? "translateX(22px)" : "translateX(2px)" }} />
    </button>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <p className="text-xs font-semibold text-[#98A2B3] uppercase tracking-wide px-1">{title}</p>;
}

function RowButton({ label, sub, onPress, danger = false, right }: { label: string; sub?: string; onPress?: () => void; danger?: boolean; right?: React.ReactNode }) {
  return (
    <button onClick={onPress} className="w-full flex items-center justify-between px-4 py-3.5 text-left active:bg-[#F9FAFB] transition">
      <div>
        <p className={`text-sm font-medium ${danger ? "text-[#C4320A]" : "text-[#1A1A1A]"}`}>{label}</p>
        {sub && <p className="text-xs text-[#667085] mt-0.5">{sub}</p>}
      </div>
      {right ?? (
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-[#D0D5DD]">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

function Divider() {
  return <div className="h-px bg-[#F2F4F7] mx-4" />;
}

type Modal = "password" | "delete" | null;

export default function SettingsScreen({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState("Ramesh Kumar Sharma");
  const [lang, setLang] = useState<"nepali" | "english">("nepali");
  const [province, setProvince] = useState("Bagmati Province");
  const [editingProfile, setEditingProfile] = useState(false);

  const [notifs, setNotifs] = useState({
    newMessages: true,
    consultationUpdates: true,
    lawyerResponses: true,
    systemAlerts: false,
    aiSessions: true,
  });

  const [twoFA, setTwoFA] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  const [deleteText, setDeleteText] = useState("");

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7]">
      {/* Header */}
      <div className="bg-[#003893] px-5 pt-14 pb-5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-white/80">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <h1 className="text-white text-lg font-semibold">Settings</h1>
        </div>
      </div>

      {/* Profile banner */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 flex items-center gap-3 flex-shrink-0" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
        <div className="w-14 h-14 rounded-full bg-[#E8EEF9] flex items-center justify-center text-[#003893] font-bold text-lg flex-shrink-0">RS</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#1A1A1A]">Ramesh Kumar Sharma</p>
          <p className="text-xs text-[#667085] mt-0.5">ramesh@example.com · +977 9812345678</p>
          <span className="inline-block mt-1 text-[10px] font-semibold text-[#027A48] bg-[#ECFDF3] px-2 py-0.5 rounded-full">Verified account</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 pb-6">

        {/* Profile */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between px-1">
            <SectionHeader title="Profile" />
            <button onClick={() => setEditingProfile(!editingProfile)} className="text-xs font-semibold text-[#003893]">
              {editingProfile ? "Save" : "Edit"}
            </button>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
            <div className="px-4 py-3.5">
              <p className="text-xs text-[#98A2B3] font-medium mb-1">Full name</p>
              {editingProfile
                ? <input value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full text-sm font-medium text-[#1A1A1A] border-b-2 border-[#003893] pb-0.5 focus:outline-none bg-transparent" />
                : <p className="text-sm font-medium text-[#1A1A1A]">{name}</p>
              }
            </div>
            <Divider />
            <div className="px-4 py-3.5">
              <p className="text-xs text-[#98A2B3] font-medium mb-2">Preferred language</p>
              <div className="flex gap-2">
                {(["nepali", "english"] as const).map((l) => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`flex-1 py-2 rounded-xl text-xs font-medium border transition ${lang === l ? "border-[#003893] bg-[#E8EEF9] text-[#003893]" : "border-[#E4E7EC] text-[#667085]"}`}>
                    {l === "nepali" ? "नेपाली" : "English"}
                  </button>
                ))}
              </div>
            </div>
            <Divider />
            <div className="px-4 py-3.5">
              <p className="text-xs text-[#98A2B3] font-medium mb-1.5">Province</p>
              <div className="relative">
                <select value={province} onChange={(e) => setProvince(e.target.value)}
                  className="w-full appearance-none bg-transparent text-sm font-medium text-[#1A1A1A] focus:outline-none pr-5">
                  {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <svg className="absolute right-0 top-1/2 -translate-y-1/2 text-[#98A2B3] pointer-events-none" width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="flex flex-col gap-1">
          <SectionHeader title="Notifications" />
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
            {(Object.entries({
              newMessages: "New messages",
              consultationUpdates: "Consultation updates",
              lawyerResponses: "Lawyer responses",
              systemAlerts: "System alerts",
              aiSessions: "AI session summaries",
            }) as [keyof typeof notifs, string][]).map(([key, label], i, arr) => (
              <div key={key}>
                <div className="flex items-center justify-between px-4 py-3.5">
                  <p className="text-sm font-medium text-[#1A1A1A]">{label}</p>
                  <Toggle value={notifs[key]} onChange={(v) => setNotifs((p) => ({ ...p, [key]: v }))} />
                </div>
                {i < arr.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="flex flex-col gap-1">
          <SectionHeader title="Security" />
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
            <RowButton label="Change password" sub="Last changed 3 months ago" onPress={() => setModal("password")} />
            <Divider />
            <div className="flex items-center justify-between px-4 py-3.5">
              <div>
                <p className="text-sm font-medium text-[#1A1A1A]">Two-factor authentication</p>
                <p className="text-xs text-[#667085] mt-0.5">{twoFA ? "Enabled via SMS" : "Not enabled"}</p>
              </div>
              <Toggle value={twoFA} onChange={setTwoFA} />
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="flex flex-col gap-1">
          <SectionHeader title="Privacy" />
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
            <RowButton label="Privacy policy" />
            <Divider />
            <RowButton label="Data & storage" />
            <Divider />
            <RowButton label="Request account deletion" danger onPress={() => setModal("delete")} right={<span />} />
          </div>
        </div>

        {/* About */}
        <div className="flex flex-col gap-1">
          <SectionHeader title="About & Legal" />
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
            <RowButton label="Terms of service" />
            <Divider />
            <RowButton label="Legal disclaimer" sub="NyayaSathi is not a law firm" />
            <Divider />
            <RowButton label="Licenses" />
            <Divider />
            <div className="px-4 py-3.5 flex items-center justify-between">
              <p className="text-sm font-medium text-[#1A1A1A]">Version</p>
              <p className="text-sm text-[#98A2B3]">1.0.0</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-[#E8EEF9] border border-[#003893]/15 rounded-2xl p-4">
          <p className="text-xs text-[#003893] font-semibold mb-1">Legal disclaimer</p>
          <p className="text-xs text-[#344054] leading-relaxed">
            NyayaSathi is not a law firm and does not provide legal advice. The AI assistant provides general legal information only. Always consult a qualified and licensed advocate for legal matters.
          </p>
        </div>

        {/* Sign out */}
        <button className="w-full py-3.5 rounded-xl border-2 border-[#E4E7EC] text-sm font-semibold text-[#C4320A] active:bg-[#FFF1F3] transition">
          Sign out
        </button>
      </div>

      {/* Modals */}
      {modal === "password" && (
        <div className="absolute inset-0 bg-black/40 flex items-end z-50" onClick={() => setModal(null)}>
          <div className="w-full bg-white rounded-t-3xl p-6 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 bg-[#E4E7EC] rounded-full mx-auto -mt-2" />
            <h3 className="text-base font-semibold text-[#1A1A1A]">Change password</h3>
            {["Current password", "New password", "Confirm new password"].map((label) => (
              <div key={label} className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#667085]">{label}</label>
                <input type="password" placeholder="••••••••"
                  className="w-full border border-[#E4E7EC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003893]/30 focus:border-[#003893] transition" />
              </div>
            ))}
            <div className="flex gap-3 mt-1">
              <button onClick={() => setModal(null)} className="flex-1 py-3 rounded-xl border-2 border-[#E4E7EC] text-sm font-semibold text-[#667085]">Cancel</button>
              <button onClick={() => setModal(null)} className="flex-1 py-3 rounded-xl bg-[#003893] text-sm font-semibold text-white">Update</button>
            </div>
          </div>
        </div>
      )}

      {modal === "delete" && (
        <div className="absolute inset-0 bg-black/40 flex items-end z-50" onClick={() => setModal(null)}>
          <div className="w-full bg-white rounded-t-3xl p-6 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 bg-[#E4E7EC] rounded-full mx-auto -mt-2" />
            <div className="w-12 h-12 rounded-full bg-[#FFF1F3] flex items-center justify-center mx-auto">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" stroke="#C4320A" strokeWidth="2" strokeLinecap="round" /><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" stroke="#C4320A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="text-center">
              <h3 className="text-base font-semibold text-[#1A1A1A]">Request account deletion</h3>
              <p className="text-sm text-[#667085] mt-1.5 leading-relaxed">All your data, cases, and chat history will be permanently deleted within 30 days. This cannot be undone.</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#667085]">Type <span className="font-bold text-[#1A1A1A]">DELETE</span> to confirm</label>
              <input value={deleteText} onChange={(e) => setDeleteText(e.target.value)} placeholder="DELETE"
                className="w-full border border-[#E4E7EC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4320A]/30 focus:border-[#C4320A] transition" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setModal(null); setDeleteText(""); }} className="flex-1 py-3 rounded-xl border-2 border-[#E4E7EC] text-sm font-semibold text-[#667085]">Cancel</button>
              <button disabled={deleteText !== "DELETE"}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition ${deleteText === "DELETE" ? "bg-[#C4320A] text-white" : "bg-[#F2F4F7] text-[#98A2B3]"}`}>
                Request deletion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
