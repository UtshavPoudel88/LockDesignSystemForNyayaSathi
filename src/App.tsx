import { useState, useRef } from "react";
import HomeScreen from "./screens/HomeScreen";
import AssistantScreen from "./screens/AssistantScreen";
import LawyersScreen from "./screens/LawyersScreen";
import ChatsScreen from "./screens/ChatsScreen";
import AIConversationScreen from "./screens/AIConversationScreen";
import CaseBriefScreen from "./screens/CaseBriefScreen";
import RecommendationsScreen from "./screens/RecommendationsScreen";
import LawyerProfileScreen from "./screens/LawyerProfileScreen";
import SavedLawyersScreen from "./screens/SavedLawyersScreen";
import ConsultationRequestsScreen from "./screens/ConsultationRequestsScreen";
import ChatRoomScreen from "./screens/ChatRoomScreen";
import ClosedConsultationsScreen from "./screens/ClosedConsultationsScreen";
import RatingScreen from "./screens/RatingScreen";
import DocumentsScreen from "./screens/DocumentsScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ArticleScreen from "./screens/ArticleScreen";
import UserProfileScreen from "./screens/UserProfileScreen";

// ─── Types ────────────────────────────────────────────────────────────────────

type AuthScreen = "splash" | "onboarding" | "role" | "signin" | "register" | "otp";
type UserRole = "user" | "lawyer";
type MainTab = "home" | "assistant" | "lawyers" | "chats" | "profile";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROVINCES = [
  "Koshi Province", "Madhesh Province", "Bagmati Province",
  "Gandaki Province", "Lumbini Province", "Karnali Province", "Sudurpashchim Province",
];

const SLIDES = [
  {
    icon: (
      <svg width="80" height="80" fill="none" viewBox="0 0 80 80">
        <rect width="80" height="80" rx="40" fill="#E8EEF9" />
        <rect x="26" y="22" width="28" height="36" rx="3" stroke="#003893" strokeWidth="2" fill="none" />
        <rect x="31" y="30" width="10" height="2" rx="1" fill="#003893" opacity=".5" />
        <rect x="31" y="35" width="18" height="2" rx="1" fill="#003893" opacity=".3" />
        <rect x="31" y="40" width="14" height="2" rx="1" fill="#003893" opacity=".3" />
        <circle cx="52" cy="52" r="10" fill="#003893" />
        <path d="M49 52h6M52 49v6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Describe your problem",
    body: "Tell our AI assistant about your legal issue in Nepali or English. Get clear, plain-language guidance instantly.",
    badge: "AI Assistant — not a lawyer",
  },
  {
    icon: (
      <svg width="80" height="80" fill="none" viewBox="0 0 80 80">
        <rect width="80" height="80" rx="40" fill="#E8EEF9" />
        <circle cx="40" cy="34" r="10" stroke="#003893" strokeWidth="2" fill="none" />
        <path d="M24 60c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#003893" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="57" cy="30" r="6" fill="#E8EEF9" stroke="#003893" strokeWidth="1.5" />
        <path d="M54.5 30.5l2 2 3.5-3.5" stroke="#DC143C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Matched with verified lawyers",
    body: "Connect with lawyers verified by NyayaSathi — specialists in your area of law, available across all seven provinces.",
    badge: null,
  },
  {
    icon: (
      <svg width="80" height="80" fill="none" viewBox="0 0 80 80">
        <rect width="80" height="80" rx="40" fill="#E8EEF9" />
        <rect x="22" y="28" width="36" height="26" rx="5" stroke="#003893" strokeWidth="2" fill="none" />
        <rect x="28" y="35" width="16" height="2" rx="1" fill="#003893" opacity=".5" />
        <rect x="28" y="40" width="10" height="2" rx="1" fill="#003893" opacity=".3" />
        <path d="M34 54v6l-6-6" stroke="#003893" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".4" />
        <circle cx="56" cy="28" r="8" fill="#003893" />
        <path d="M53 28l2 2.5 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Chat securely",
    body: "Your conversations are private and encrypted. Discuss your case with total confidence.",
    badge: null,
  },
];

// ─── Shared primitives ────────────────────────────────────────────────────────

function Logo({ light = false, size = "md" }: { light?: boolean; size?: "sm" | "md" }) {
  const s = size === "sm" ? 44 : 52;
  return (
    <div className="flex items-center gap-3">
      <svg width={s} height={s} viewBox="0 0 52 52" fill="none">
        <rect width="52" height="52" rx="13" fill={light ? "rgba(255,255,255,0.15)" : "#003893"} />
        <path d="M26 10L38 32H14L26 10Z" fill="#DC143C" />
        <path d="M26 17L35 32H17L26 17Z" fill={light ? "rgba(255,255,255,0.25)" : "rgba(0,56,147,0.6)"} />
        <rect x="20" y="33" width="12" height="3" rx="1.5" fill={light ? "#fff" : "#DC143C"} opacity=".9" />
        <rect x="23" y="37" width="6" height="6" rx="1" fill={light ? "rgba(255,255,255,0.7)" : "#fff"} opacity=".7" />
      </svg>
      <div>
        <div className={`font-semibold tracking-tight leading-none ${size === "sm" ? "text-base" : "text-xl"} ${light ? "text-white" : "text-[#003893]"}`}>NyayaSathi</div>
        <div className={`text-[11px] font-medium mt-0.5 ${light ? "text-white/60" : "text-[#667085]"}`} style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>न्यायसाथी</div>
      </div>
    </div>
  );
}

function PrimaryButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick}
      className="w-full rounded-xl bg-[#003893] py-3.5 text-sm font-semibold text-white shadow-sm active:opacity-90 transition">
      {label}
    </button>
  );
}

function FieldInput({ label, type = "text", placeholder, value, onChange, right }: {
  label: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[#1A1A1A]">{label}</label>
      <div className="relative">
        <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-[#E4E7EC] bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#003893]/30 focus:border-[#003893] transition" />
        {right && <div className="absolute right-3 top-1/2 -translate-y-1/2">{right}</div>}
      </div>
    </div>
  );
}

// ─── Bottom nav ───────────────────────────────────────────────────────────────

const NAV_TABS: { id: MainTab; label: string; icon: (active: boolean) => React.ReactNode }[] = [
  {
    id: "home", label: "Home",
    icon: (a) => <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke={a ? "#003893" : "#667085"} strokeWidth="1.8" fill={a ? "#E8EEF9" : "none"} /><path d="M9 21V12h6v9" stroke={a ? "#003893" : "#667085"} strokeWidth="1.8" strokeLinecap="round" /></svg>,
  },
  {
    id: "assistant", label: "Assistant",
    icon: (a) => <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="14" rx="3" stroke={a ? "#003893" : "#667085"} strokeWidth="1.8" fill={a ? "#E8EEF9" : "none"} /><path d="M8 9h8M8 13h5" stroke={a ? "#003893" : "#667085"} strokeWidth="1.8" strokeLinecap="round" /><path d="M8 18v3l-3-3" stroke={a ? "#003893" : "#667085"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    id: "lawyers", label: "Lawyers",
    icon: (a) => <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke={a ? "#003893" : "#667085"} strokeWidth="1.8" fill={a ? "#E8EEF9" : "none"} /><path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke={a ? "#003893" : "#667085"} strokeWidth="1.8" strokeLinecap="round" /></svg>,
  },
  {
    id: "chats", label: "Chats",
    icon: (a) => <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H8l-4 4V5a1 1 0 0 1 1-1z" stroke={a ? "#003893" : "#667085"} strokeWidth="1.8" fill={a ? "#E8EEF9" : "none"} strokeLinejoin="round" /></svg>,
  },
  {
    id: "profile", label: "Profile",
    icon: (a) => <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke={a ? "#003893" : "#667085"} strokeWidth="1.8" fill={a ? "#E8EEF9" : "none"} /><path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke={a ? "#003893" : "#667085"} strokeWidth="1.8" strokeLinecap="round" /><circle cx="12" cy="8" r="2" fill={a ? "#003893" : "none"} /></svg>,
  },
];

function BottomNav({ active, onChange }: { active: MainTab; onChange: (t: MainTab) => void }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-around bg-white px-1 pt-2 pb-6 border-t border-[#F2F4F7]"
      style={{ boxShadow: "0 -4px 16px rgba(0,0,0,0.06)" }}>
      {NAV_TABS.map((t) => {
        const isActive = t.id === active;
        return (
          <button key={t.id} onClick={() => onChange(t.id)}
            className="flex flex-col items-center gap-0.5 flex-1 min-w-0">
            {t.icon(isActive)}
            <span className={`text-[10px] font-medium ${isActive ? "text-[#003893]" : "text-[#667085]"}`}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Role selection ───────────────────────────────────────────────────────────

function RoleSelectScreen({ onSelect }: { onSelect: (role: UserRole) => void }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="bg-[#003893] px-6 pt-14 pb-10 flex flex-col items-center gap-4">
        <Logo light />
        <p className="text-white/70 text-sm text-center leading-relaxed mt-1">
          Tell us how you'll be using NyayaSathi so we can set up the right experience for you.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 gap-4">
        <h2 className="text-lg font-semibold text-[#1A1A1A] text-center mb-2">Who are you?</h2>

        {/* Client card */}
        <button onClick={() => onSelect("user")}
          className="w-full rounded-2xl border-2 border-[#E4E7EC] p-5 text-left flex items-start gap-4 active:border-[#003893] active:bg-[#E8EEF9] transition group">
          <div className="w-14 h-14 rounded-2xl bg-[#E8EEF9] flex items-center justify-center flex-shrink-0 group-active:bg-[#003893]/15">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" stroke="#003893" strokeWidth="2" />
              <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#003893" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-base font-semibold text-[#1A1A1A]">I need legal help</p>
            <p className="text-sm text-[#667085] mt-1 leading-relaxed">Find legal guidance, connect with verified lawyers, and understand your rights.</p>
          </div>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-[#003893] flex-shrink-0 mt-1">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Lawyer card */}
        <button onClick={() => onSelect("lawyer")}
          className="w-full rounded-2xl border-2 border-[#E4E7EC] p-5 text-left flex items-start gap-4 active:border-[#003893] active:bg-[#E8EEF9] transition group">
          <div className="w-14 h-14 rounded-2xl bg-[#FFF9E6] flex items-center justify-center flex-shrink-0 group-active:bg-[#FFF3C7]">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="#B54708" strokeWidth="2" />
              <path d="M7 8h10M7 12h10M7 16h6" stroke="#B54708" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold text-[#1A1A1A]">I'm a lawyer</p>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF9E6] text-[#B54708]">Advocate</span>
            </div>
            <p className="text-sm text-[#667085] mt-1 leading-relaxed">Join as a verified advocate to receive client consultations and manage your cases.</p>
          </div>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-[#003893] flex-shrink-0 mt-1">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <p className="text-center text-xs text-[#98A2B3] mt-2">You can change this later in Settings.</p>
      </div>
    </div>
  );
}

// ─── Auth screens ─────────────────────────────────────────────────────────────

function SplashScreen({ onDone }: { onDone: () => void }) {
  useState(() => { const t = setTimeout(onDone, 2600); return () => clearTimeout(t); });
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 bg-[#003893]">
      <div className="flex flex-col items-center gap-5">
        <svg width="100" height="100" viewBox="0 0 52 52" fill="none">
          <rect width="52" height="52" rx="13" fill="rgba(255,255,255,0.12)" />
          <path d="M26 10L38 32H14L26 10Z" fill="#DC143C" />
          <path d="M26 17L35 32H17L26 17Z" fill="rgba(255,255,255,0.2)" />
          <rect x="20" y="33" width="12" height="3" rx="1.5" fill="rgba(255,255,255,0.8)" />
          <rect x="23" y="37" width="6" height="6" rx="1" fill="rgba(255,255,255,0.55)" />
        </svg>
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-white text-3xl font-semibold tracking-tight">NyayaSathi</h1>
          <p className="text-white/55 text-base" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>न्यायसाथी</p>
        </div>
        <p className="text-white/70 text-sm font-medium tracking-wide">Legal help made simple</p>
      </div>
      <div className="absolute bottom-14 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`h-1.5 rounded-full bg-white transition-all ${i === 0 ? "w-8 opacity-100" : "w-2 opacity-30"}`} />
        ))}
      </div>
    </div>
  );
}

function OnboardingScreen({ onDone }: { onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const startX = useRef(0);
  const next = () => { if (idx < 2) setIdx(idx + 1); else onDone(); };
  const slide = SLIDES[idx];

  return (
    <div className="flex h-full flex-col bg-white"
      onTouchStart={(e) => { startX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const dx = startX.current - e.changedTouches[0].clientX;
        if (dx > 40) next();
        if (dx < -40 && idx > 0) setIdx(idx - 1);
      }}>
      <div className="flex justify-end px-6 pt-14 pb-2">
        <button onClick={onDone} className="text-sm font-medium text-[#667085]">Skip</button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-8 gap-8 text-center">
        {slide.icon}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-[#1A1A1A]">{slide.title}</h2>
          <p className="text-sm text-[#667085] leading-relaxed">{slide.body}</p>
        </div>
        {slide.badge && (
          <div className="rounded-full bg-[#E8EEF9] px-4 py-1.5 text-xs font-medium text-[#003893]">{slide.badge}</div>
        )}
      </div>
      <div className="flex flex-col items-center gap-5 px-6 pb-14">
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === idx ? "w-6 bg-[#003893]" : "w-2 bg-[#E4E7EC]"}`} />
          ))}
        </div>
        <PrimaryButton label={idx < 2 ? "Next" : "Get started"} onClick={next} />
      </div>
    </div>
  );
}

function SignInScreen({ role, onSignIn, onRegister, onBack }: { role: UserRole; onSignIn: () => void; onRegister: () => void; onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const isLawyer = role === "lawyer";

  const EyeIcon = () => showPw
    ? <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
    : <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" /></svg>;

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="bg-[#003893] px-6 pt-14 pb-8">
        <button onClick={onBack} className="text-white/70 mb-4 flex items-center gap-1.5 text-sm">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Change role
        </button>
        <Logo light />
        {/* Role pill */}
        <div className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ${isLawyer ? "bg-[#FFF9E6]/20 border border-[#FFF9E6]/30" : "bg-white/10 border border-white/20"}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isLawyer ? "bg-[#F79009]" : "bg-[#12B76A]"}`} />
          <span className="text-white/80 text-xs font-medium">{isLawyer ? "Signing in as Advocate" : "Signing in as Client"}</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pt-8 flex flex-col gap-5">
        <div>
          <h2 className="text-xl font-semibold text-[#1A1A1A]">Welcome back</h2>
          <p className="text-sm text-[#667085] mt-1">{isLawyer ? "Sign in to your advocate account" : "Sign in to your NyayaSathi account"}</p>
        </div>
        <div className="flex flex-col gap-4">
          <FieldInput label={isLawyer ? "Email or Bar Council No." : "Email or phone number"} placeholder={isLawyer ? "Enter email or NBA number" : "Enter email or phone"} value={email} onChange={setEmail} />
          <FieldInput label="Password" type={showPw ? "text" : "password"} placeholder="Enter password" value={password} onChange={setPassword}
            right={<button onClick={() => setShowPw(!showPw)} className="text-[#667085]"><EyeIcon /></button>} />
          <div className="flex justify-end -mt-1">
            <button className="text-sm font-medium text-[#003893]">Forgot password?</button>
          </div>
        </div>
        <PrimaryButton label="Sign In" onClick={onSignIn} />
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#F2F4F7]" />
          <span className="text-xs text-[#98A2B3]">or</span>
          <div className="flex-1 h-px bg-[#F2F4F7]" />
        </div>
        <p className="text-center text-sm pb-8">
          <span className="text-[#667085]">{isLawyer ? "New advocate? " : "New to NyayaSathi? "}</span>
          <button onClick={onRegister} className="font-semibold text-[#003893]">{isLawyer ? "Register as advocate" : "Create account"}</button>
        </p>
      </div>
    </div>
  );
}

function RegisterScreen({ role, onBack, onVerify }: { role: UserRole; onBack: () => void; onVerify: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [lang, setLang] = useState<"nepali" | "english">("nepali");
  const [province, setProvince] = useState("");
  const [agreed, setAgreed] = useState(false);
  // Lawyer-only
  const [barNo, setBarNo] = useState("");
  const [spec, setSpec] = useState("");
  const [neba, setNeba] = useState("");
  const isLawyer = role === "lawyer";

  const SelectField = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[#1A1A1A]">{label}</label>
      <div className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-[#E4E7EC] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#003893]/30 focus:border-[#003893]">
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" width="16" height="16" fill="none" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="bg-[#003893] px-6 pt-14 pb-5 flex items-center gap-4">
        <button onClick={onBack} className="text-white/80">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-white">{isLawyer ? "Register as Advocate" : "Create account"}</h1>
          <p className="text-white/60 text-xs mt-0.5">{isLawyer ? "Nepal Bar Association verified" : "Join NyayaSathi today"}</p>
        </div>
        <div className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${isLawyer ? "bg-[#FFF9E6] text-[#B54708]" : "bg-[#E8EEF9] text-[#003893]"}`}>
          {isLawyer ? "Advocate" : "Client"}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
        <FieldInput label="Full name" placeholder={isLawyer ? "Adv. Sunita Maharjan" : "Ramesh Kumar Sharma"} value={name} onChange={setName} />
        <FieldInput label="Email address" type="email" placeholder="your@email.com" value={email} onChange={setEmail} />
        <FieldInput label="Phone number" type="tel" placeholder="+977 98XXXXXXXX" value={phone} onChange={setPhone} />

        {/* Lawyer-only fields */}
        {isLawyer && (
          <>
            <FieldInput label="Nepal Bar Council Registration No." placeholder="NBA-YYYY-XXXXX" value={barNo} onChange={setBarNo} />
            <SelectField label="Specialization" value={spec} onChange={setSpec}
              options={["Multiple Legal Areas", "Labour Law", "Civil Law", "Criminal Law", "Family Law", "Property Law", "Business Law", "Constitutional Law"]} />
            <FieldInput label="NeSBA / District Bar No. (optional)" placeholder="e.g. KTM-2015-0234" value={neba} onChange={setNeba} />
          </>
        )}

        <FieldInput label="Password" type="password" placeholder="Minimum 8 characters" value={password} onChange={setPassword} />
        <FieldInput label="Confirm password" type="password" placeholder="Re-enter password" value={confirm} onChange={setConfirm} />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1A1A1A]">Preferred language</label>
          <div className="flex gap-3">
            {(["nepali", "english"] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)}
                className={`flex-1 rounded-xl border py-3 text-sm font-medium transition ${lang === l ? "border-[#003893] bg-[#E8EEF9] text-[#003893]" : "border-[#E4E7EC] text-[#667085]"}`}>
                {l === "nepali" ? "नेपाली" : "English"}
              </button>
            ))}
          </div>
        </div>
        <SelectField label="Province" value={province} onChange={setProvince} options={PROVINCES} />

        <label className="flex items-start gap-3 cursor-pointer">
          <div onClick={() => setAgreed(!agreed)}
            className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition ${agreed ? "bg-[#003893] border-[#003893]" : "border-[#D0D5DD]"}`}>
            {agreed && <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </div>
          <span className="text-sm text-[#667085] leading-snug">
            I agree to the <span className="text-[#003893] font-medium">Terms of Service</span> and <span className="text-[#003893] font-medium">Privacy Policy</span>
            {isLawyer && <span> and confirm my Bar Council registration details are accurate.</span>}
          </span>
        </label>
        <PrimaryButton label={isLawyer ? "Register as Advocate" : "Create Account"} onClick={onVerify} />
        <p className="text-center text-sm pb-6">
          <span className="text-[#667085]">Already have an account? </span>
          <button onClick={onBack} className="font-semibold text-[#003893]">Sign in</button>
        </p>
      </div>
    </div>
  );
}

function OTPScreen({ onBack, onVerify }: { onBack: () => void; onVerify: () => void }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resent, setResent] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="bg-[#003893] px-6 pt-14 pb-5 flex items-center gap-4">
        <button onClick={onBack} className="text-white/80">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div>
          <h1 className="text-lg font-semibold text-white">Verify phone</h1>
          <p className="text-white/60 text-xs mt-0.5">We've sent a 6-digit code</p>
        </div>
      </div>
      <div className="flex-1 px-6 pt-10 flex flex-col gap-8">
        <div>
          <h2 className="text-xl font-semibold text-[#1A1A1A]">Enter verification code</h2>
          <p className="text-sm text-[#667085] mt-1.5 leading-relaxed">A 6-digit code was sent to your phone. Enter it below to verify your account.</p>
        </div>
        <div className="flex gap-3 justify-center">
          {otp.map((digit, i) => (
            <input key={i} ref={(el) => { inputs.current[i] = el; }}
              type="text" inputMode="numeric" maxLength={1} value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => { if (e.key === "Backspace" && !otp[i] && i > 0) inputs.current[i - 1]?.focus(); }}
              className={`w-12 h-14 rounded-xl border-2 text-center text-xl font-semibold text-[#1A1A1A] focus:outline-none transition ${digit ? "border-[#003893] bg-[#E8EEF9]" : "border-[#E4E7EC]"} focus:border-[#003893]`}
            />
          ))}
        </div>
        <p className="text-center text-sm">
          {resent
            ? <span className="text-[#003893] font-medium">Code resent!</span>
            : <><span className="text-[#667085]">Didn't receive it? </span>
              <button onClick={() => { setResent(true); setTimeout(() => setResent(false), 3000); }} className="font-semibold text-[#003893]">Resend</button></>
          }
        </p>
        <PrimaryButton label="Verify" onClick={onVerify} />
      </div>
    </div>
  );
}

// ─── Main app shell ────────────────────────────────────────────────────────────

type ConsultFlow = "list" | "conversation" | "brief" | "recommendations";
type LawyersFlow = "list" | "profile" | "saved";
type ChatsFlow = "list" | "requests" | "room" | "closed" | "rating";
type HomeFlow = "main" | "notifications" | "settings" | "documents";
type ProfileFlow = "main" | "settings" | "documents" | "article";

function LawyerNavTabs(role: UserRole): typeof NAV_TABS {
  if (role !== "lawyer") return NAV_TABS;
  return NAV_TABS.filter((t) => t.id !== "assistant").map((t) => {
    if (t.id === "lawyers") return { ...t, label: "Clients" };
    return t;
  });
}

function MainApp({ role }: { role: UserRole }) {
  const [tab, setTab] = useState<MainTab>(role === "lawyer" ? "home" : "home");
  const [consultFlow, setConsultFlow] = useState<ConsultFlow>("list");
  const [lawyersFlow, setLawyersFlow] = useState<LawyersFlow>("list");
  const [chatsFlow, setChatsFlow] = useState<ChatsFlow>("list");
  const [homeFlow, setHomeFlow] = useState<HomeFlow>("main");
  const [profileFlow, setProfileFlow] = useState<ProfileFlow>("main");

  const handleTabChange = (t: MainTab) => {
    setTab(t);
    if (t === "assistant") setConsultFlow("list");
    if (t === "lawyers") setLawyersFlow("list");
    if (t === "chats") setChatsFlow("list");
    if (t === "home") setHomeFlow("main");
    if (t === "profile") setProfileFlow("main");
  };

  const isSubscreen =
    (tab === "assistant" && consultFlow !== "list") ||
    (tab === "lawyers" && lawyersFlow !== "list") ||
    (tab === "chats" && chatsFlow !== "list") ||
    (tab === "home" && homeFlow !== "main") ||
    (tab === "profile" && profileFlow !== "main");

  const screen = () => {
    if (tab === "home") {
      if (homeFlow === "notifications") return <div className="absolute inset-0 overflow-hidden"><NotificationsScreen onBack={() => setHomeFlow("main")} /></div>;
      if (homeFlow === "settings") return <div className="absolute inset-0 overflow-hidden"><SettingsScreen onBack={() => setHomeFlow("main")} /></div>;
      if (homeFlow === "documents") return <div className="absolute inset-0 overflow-hidden"><DocumentsScreen onBack={() => setHomeFlow("main")} /></div>;
      return (
        <div className="absolute inset-0 overflow-y-auto">
          <HomeScreen
            role={role}
            onNotifications={() => setHomeFlow("notifications")}
            onSettings={() => setHomeFlow("settings")}
            onDocuments={() => setHomeFlow("documents")}
          />
        </div>
      );
    }

    if (tab === "assistant") {
      if (consultFlow === "list") return <div className="absolute inset-0 overflow-hidden"><AssistantScreen onNewConsultation={() => setConsultFlow("conversation")} /></div>;
      if (consultFlow === "conversation") return <div className="absolute inset-0 overflow-hidden"><AIConversationScreen onCaseBrief={() => setConsultFlow("brief")} /></div>;
      if (consultFlow === "brief") return <div className="absolute inset-0 overflow-hidden"><CaseBriefScreen onBack={() => setConsultFlow("conversation")} onFindLawyers={() => setConsultFlow("recommendations")} /></div>;
      if (consultFlow === "recommendations") return <div className="absolute inset-0 overflow-hidden"><RecommendationsScreen onBack={() => setConsultFlow("brief")} onViewProfile={() => { setLawyersFlow("profile"); setTab("lawyers"); }} /></div>;
    }

    if (tab === "lawyers") {
      if (lawyersFlow === "list") return <div className="absolute inset-0 overflow-hidden"><LawyersScreen onViewProfile={() => setLawyersFlow("profile")} onViewSaved={() => setLawyersFlow("saved")} /></div>;
      if (lawyersFlow === "profile") return <div className="absolute inset-0 overflow-hidden"><LawyerProfileScreen onBack={() => setLawyersFlow("list")} onRequestConsultation={() => { setChatsFlow("requests"); setTab("chats"); }} /></div>;
      if (lawyersFlow === "saved") return <div className="absolute inset-0 overflow-hidden"><SavedLawyersScreen onBack={() => setLawyersFlow("list")} onViewProfile={() => setLawyersFlow("profile")} /></div>;
    }

    if (tab === "chats") {
      if (chatsFlow === "list") return <div className="absolute inset-0 overflow-hidden"><ChatsScreen role={role} onOpenChat={() => setChatsFlow("room")} onOpenRequests={() => setChatsFlow("requests")} onOpenClosed={() => setChatsFlow("closed")} /></div>;
      if (chatsFlow === "room") return <div className="absolute inset-0 overflow-hidden"><ChatRoomScreen onBack={() => setChatsFlow("list")} /></div>;
      if (chatsFlow === "requests") return <div className="absolute inset-0 overflow-hidden"><ConsultationRequestsScreen onBack={() => setChatsFlow("list")} onOpenChat={() => setChatsFlow("room")} /></div>;
      if (chatsFlow === "closed") return <div className="absolute inset-0 overflow-hidden"><ClosedConsultationsScreen onBack={() => setChatsFlow("list")} onRate={() => setChatsFlow("rating")} /></div>;
      if (chatsFlow === "rating") return <div className="absolute inset-0 overflow-hidden"><RatingScreen onBack={() => setChatsFlow("closed")} onSubmit={() => setChatsFlow("closed")} /></div>;
    }

    if (tab === "profile") {
      if (profileFlow === "settings") return <div className="absolute inset-0 overflow-hidden"><SettingsScreen onBack={() => setProfileFlow("main")} /></div>;
      if (profileFlow === "documents") return <div className="absolute inset-0 overflow-hidden"><DocumentsScreen onBack={() => setProfileFlow("main")} /></div>;
      if (profileFlow === "article") return <div className="absolute inset-0 overflow-hidden"><ArticleScreen onBack={() => setProfileFlow("main")} /></div>;
      return (
        <div className="absolute inset-0 overflow-hidden">
          <UserProfileScreen
            role={role}
            onSettings={() => setProfileFlow("settings")}
            onDocuments={() => setProfileFlow("documents")}
            onOpenArticle={() => setProfileFlow("article")}
          />
        </div>
      );
    }

    return null;
  };

  const navTabs = LawyerNavTabs(role);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden relative">{screen()}</div>
      {!isSubscreen && (
        <div className="flex-shrink-0 flex items-center justify-around bg-white px-1 pt-2 pb-6 border-t border-[#F2F4F7]"
          style={{ boxShadow: "0 -4px 16px rgba(0,0,0,0.06)" }}>
          {navTabs.map((t) => {
            const isActive = t.id === tab;
            return (
              <button key={t.id} onClick={() => handleTabChange(t.id)}
                className="flex flex-col items-center gap-0.5 flex-1 min-w-0">
                {t.icon(isActive)}
                <span className={`text-[10px] font-medium ${isActive ? "text-[#003893]" : "text-[#667085]"}`}>{t.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [authScreen, setAuthScreen] = useState<AuthScreen | "app">("splash");
  const [role, setRole] = useState<UserRole>("user");

  const selectRole = (r: UserRole) => { setRole(r); setAuthScreen("signin"); };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#D1D9E6]"
      style={{ background: "linear-gradient(135deg, #c8d3e8 0%, #dce3ef 100%)" }}>
      <div className="relative w-[390px] h-[844px] overflow-hidden bg-white"
        style={{ borderRadius: 48, boxShadow: "0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.07), inset 0 0 0 1px rgba(255,255,255,0.3)" }}>
        {authScreen === "splash" && <SplashScreen onDone={() => setAuthScreen("onboarding")} />}
        {authScreen === "onboarding" && <OnboardingScreen onDone={() => setAuthScreen("role")} />}
        {authScreen === "role" && <RoleSelectScreen onSelect={selectRole} />}
        {authScreen === "signin" && <SignInScreen role={role} onBack={() => setAuthScreen("role")} onSignIn={() => setAuthScreen("app")} onRegister={() => setAuthScreen("register")} />}
        {authScreen === "register" && <RegisterScreen role={role} onBack={() => setAuthScreen("signin")} onVerify={() => setAuthScreen("otp")} />}
        {authScreen === "otp" && <OTPScreen onBack={() => setAuthScreen("register")} onVerify={() => setAuthScreen("app")} />}
        {authScreen === "app" && <MainApp role={role} />}
      </div>
    </div>
  );
}
