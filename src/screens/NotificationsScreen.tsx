import { useState } from "react";

type NotifType = "case" | "chat" | "lawyer" | "system" | "doc";

type Notif = {
  id: number;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

const NOTIFS: Notif[] = [
  { id: 1, type: "lawyer", title: "Consultation accepted", body: "Adv. Sunita Maharjan has accepted your consultation request for Wrongful Termination.", time: "Just now", unread: true },
  { id: 2, type: "chat", title: "New message", body: "Adv. Sunita Maharjan: \"I have reviewed your case brief. Please share your employment contract…\"", time: "12 min ago", unread: true },
  { id: 3, type: "case", title: "Case brief updated", body: "Your AI assistant updated the case brief for Wrongful Termination with new information.", time: "2 hrs ago", unread: true },
  { id: 4, type: "lawyer", title: "Clarification requested", body: "Adv. Rajesh Adhikari needs more information before accepting your request.", time: "3 hrs ago", unread: true },
  { id: 5, type: "doc", title: "Document shared", body: "Your document 'Employment_Contract_2022.pdf' was shared with Adv. Sunita Maharjan.", time: "Yesterday", unread: false },
  { id: 6, type: "chat", title: "New message from AI", body: "Your AI consultation summary for Land Registration is ready to review.", time: "Yesterday", unread: false },
  { id: 7, type: "system", title: "Account verified", body: "Your NyayaSathi account identity has been verified successfully.", time: "Aug 27", unread: false },
  { id: 8, type: "lawyer", title: "Request declined", body: "Adv. Deepak Gurung is currently at full capacity and cannot take new clients.", time: "Aug 25", unread: false },
  { id: 9, type: "case", title: "Reminder: Rate your lawyer", body: "Your consultation with Adv. Priya Shrestha is closed. Share your experience.", time: "Aug 24", unread: false },
  { id: 10, type: "system", title: "New Constitution content", body: "Fundamental Rights (Part 3) has been updated with annotations in Nepali.", time: "Aug 20", unread: false },
];

const TYPE_CONFIG: Record<NotifType, { bg: string; icon: React.ReactNode }> = {
  case: {
    bg: "bg-[#E8EEF9]",
    icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#003893" strokeWidth="2" /><path d="M7 8h10M7 12h10M7 16h6" stroke="#003893" strokeWidth="2" strokeLinecap="round" /></svg>,
  },
  chat: {
    bg: "bg-[#F0FDF4]",
    icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H8l-4 4V5a1 1 0 0 1 1-1z" stroke="#027A48" strokeWidth="2" strokeLinejoin="round" /></svg>,
  },
  lawyer: {
    bg: "bg-[#EEF4FF]",
    icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#3538CD" strokeWidth="2" /><path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#3538CD" strokeWidth="2" strokeLinecap="round" /></svg>,
  },
  doc: {
    bg: "bg-[#FFF9E6]",
    icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#B54708" strokeWidth="2" /><path d="M14 2v6h6M9 13h6M9 17h4" stroke="#B54708" strokeWidth="2" strokeLinecap="round" /></svg>,
  },
  system: {
    bg: "bg-[#F2F4F7]",
    icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#667085" strokeWidth="2" /><path d="M12 8v4M12 16h.01" stroke="#667085" strokeWidth="2" strokeLinecap="round" /></svg>,
  },
};

export default function NotificationsScreen({ onBack }: { onBack: () => void }) {
  const [notifs, setNotifs] = useState<Notif[]>(NOTIFS);
  const unreadCount = notifs.filter((n) => n.unread).length;

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
  const markRead = (id: number) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, unread: false } : n));

  const todayItems = notifs.filter((n) => ["Just now", "12 min ago", "2 hrs ago", "3 hrs ago"].includes(n.time));
  const yesterdayItems = notifs.filter((n) => n.time === "Yesterday");
  const earlierItems = notifs.filter((n) => !["Just now", "12 min ago", "2 hrs ago", "3 hrs ago", "Yesterday"].includes(n.time));

  const Section = ({ title, items }: { title: string; items: Notif[] }) =>
    items.length === 0 ? null : (
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-[#98A2B3] uppercase tracking-wide px-1">{title}</p>
        {items.map((n) => {
          const cfg = TYPE_CONFIG[n.type];
          return (
            <button key={n.id} onClick={() => markRead(n.id)}
              className={`w-full bg-white rounded-2xl p-4 flex items-start gap-3 text-left active:bg-[#F9FAFB] transition ${n.unread ? "border border-[#003893]/10" : ""}`}
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                {cfg.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm leading-snug ${n.unread ? "font-semibold text-[#1A1A1A]" : "font-medium text-[#344054]"}`}>{n.title}</p>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <p className="text-[11px] text-[#98A2B3] whitespace-nowrap">{n.time}</p>
                    {n.unread && <div className="w-2 h-2 rounded-full bg-[#003893] flex-shrink-0" />}
                  </div>
                </div>
                <p className="text-xs text-[#667085] mt-1 leading-relaxed line-clamp-2">{n.body}</p>
              </div>
            </button>
          );
        })}
      </div>
    );

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7]">
      {/* Header */}
      <div className="bg-[#003893] px-5 pt-14 pb-5 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-white/80">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div>
              <h1 className="text-white text-lg font-semibold">Notifications</h1>
              {unreadCount > 0 && <p className="text-white/55 text-xs mt-0.5">{unreadCount} unread</p>}
            </div>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-white/70 text-xs font-medium bg-white/10 rounded-lg px-3 py-1.5">
              Mark all read
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-5 pb-6">
        <Section title="Today" items={todayItems} />
        <Section title="Yesterday" items={yesterdayItems} />
        <Section title="Earlier" items={earlierItems} />
      </div>
    </div>
  );
}
