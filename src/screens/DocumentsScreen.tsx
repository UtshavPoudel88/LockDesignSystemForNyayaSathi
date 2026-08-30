import { useState, useRef } from "react";

type Doc = {
  id: number;
  name: string;
  type: "pdf" | "jpg" | "docx" | "png";
  size: string;
  date: string;
  case: string;
};

const INITIAL_DOCS: Doc[] = [
  { id: 1, name: "Employment_Contract_2022.pdf", type: "pdf", size: "312 KB", date: "Aug 27, 2026", case: "Wrongful Termination" },
  { id: 2, name: "Salary_Slips_Jul2026.pdf", type: "pdf", size: "184 KB", date: "Aug 27, 2026", case: "Wrongful Termination" },
  { id: 3, name: "Termination_Notice_Photo.jpg", type: "jpg", size: "2.1 MB", date: "Aug 26, 2026", case: "Wrongful Termination" },
  { id: 4, name: "Land_Registry_Certificate.pdf", type: "pdf", size: "540 KB", date: "Aug 10, 2026", case: "Property Dispute" },
  { id: 5, name: "Witness_Statement_Draft.docx", type: "docx", size: "28 KB", date: "Aug 28, 2026", case: "Wrongful Termination" },
  { id: 6, name: "Boundary_Map_Scan.png", type: "png", size: "1.4 MB", date: "Jul 20, 2026", case: "Property Dispute" },
];

const TYPE_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  pdf: { bg: "bg-[#FFF1F3]", text: "text-[#C4320A]", label: "PDF" },
  jpg: { bg: "bg-[#F0FDF4]", text: "text-[#027A48]", label: "JPG" },
  png: { bg: "bg-[#F0FDF4]", text: "text-[#027A48]", label: "PNG" },
  docx: { bg: "bg-[#EEF4FF]", text: "text-[#3538CD]", label: "DOC" },
};

function DocIcon({ type }: { type: string }) {
  const c = TYPE_COLORS[type] ?? { bg: "bg-[#F2F4F7]", text: "text-[#667085]", label: "FILE" };
  return (
    <div className={`w-12 h-12 rounded-xl ${c.bg} flex flex-col items-center justify-center gap-0.5 flex-shrink-0`}>
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.8" className={c.text} />
        <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={c.text} />
      </svg>
      <span className={`text-[8px] font-bold ${c.text}`}>{c.label}</span>
    </div>
  );
}

type Modal = { type: "share" | "delete"; doc: Doc } | null;

export default function DocumentsScreen({ onBack }: { onBack: () => void }) {
  const [docs, setDocs] = useState<Doc[]>(INITIAL_DOCS);
  const [modal, setModal] = useState<Modal>(null);
  const [search, setSearch] = useState("");
  const [sharedIds, setSharedIds] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = docs.filter(
    (d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.case.toLowerCase().includes(search.toLowerCase())
  );

  const confirmShare = () => {
    if (modal?.type === "share") setSharedIds((p) => [...p, modal.doc.id]);
    setModal(null);
  };
  const confirmDelete = () => {
    if (modal?.type === "delete") setDocs((p) => p.filter((d) => d.id !== modal.doc.id));
    setModal(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7]">
      {/* Header */}
      <div className="bg-[#003893] px-5 pt-14 pb-5 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-white/80">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div>
              <h1 className="text-white text-lg font-semibold">Documents</h1>
              <p className="text-white/55 text-xs mt-0.5">{docs.length} files</p>
            </div>
          </div>
          <button onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 bg-white/15 border border-white/20 rounded-xl px-3.5 py-2 text-xs font-semibold text-white active:bg-white/20 transition">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
            Upload
          </button>
          <input ref={fileInputRef} type="file" multiple className="hidden" />
        </div>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" width="15" height="15" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/12 border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:bg-white/18 transition" />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5 pb-6">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#D0D5DD" strokeWidth="1.8" />
                <path d="M14 2v6h6" stroke="#D0D5DD" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-[#667085] text-sm">{search ? `No files matching "${search}"` : "No documents uploaded yet"}</p>
          </div>
        )}

        {filtered.map((doc) => (
          <div key={doc.id} className="bg-white rounded-2xl p-3.5 flex items-center gap-3" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
            <DocIcon type={doc.type} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1A1A1A] truncate leading-snug">{doc.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] text-[#98A2B3]">{doc.size}</span>
                <span className="text-[#E4E7EC]">·</span>
                <span className="text-[11px] text-[#98A2B3]">{doc.date}</span>
              </div>
              <span className="text-[10px] font-medium text-[#003893] bg-[#E8EEF9] px-2 py-0.5 rounded-full mt-1 inline-block">{doc.case}</span>
              {sharedIds.includes(doc.id) && (
                <span className="ml-2 text-[10px] font-medium text-[#027A48] bg-[#ECFDF3] px-2 py-0.5 rounded-full inline-block">Shared</span>
              )}
            </div>
            {/* Actions */}
            <div className="flex flex-col gap-1.5 flex-shrink-0">
              <button onClick={() => setModal({ type: "share", doc })}
                className="w-8 h-8 rounded-lg bg-[#E8EEF9] flex items-center justify-center text-[#003893] active:bg-[#D0DCF0] transition">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.8" /><circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" /><circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.8" /><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
              <button onClick={() => setModal({ type: "delete", doc })}
                className="w-8 h-8 rounded-lg bg-[#FFF1F3] flex items-center justify-center text-[#C4320A] active:bg-[#FFE0E5] transition">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div className="absolute inset-0 bg-black/40 flex items-end z-50" onClick={() => setModal(null)}>
          <div className="w-full bg-white rounded-t-3xl p-6 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: "0 -8px 32px rgba(0,0,0,0.15)" }}>
            <div className="w-10 h-1 bg-[#E4E7EC] rounded-full mx-auto -mt-2" />

            {modal.type === "share" ? (
              <>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-[#1A1A1A]">Share document?</h3>
                  <p className="text-sm text-[#667085] leading-relaxed">
                    <span className="font-medium text-[#1A1A1A]">{modal.doc.name}</span> will be shared with your assigned lawyer. They will be able to view and download it.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setModal(null)} className="flex-1 py-3 rounded-xl border-2 border-[#E4E7EC] text-sm font-semibold text-[#667085]">Cancel</button>
                  <button onClick={confirmShare} className="flex-1 py-3 rounded-xl bg-[#003893] text-sm font-semibold text-white">Share</button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-[#1A1A1A]">Delete document?</h3>
                  <p className="text-sm text-[#667085] leading-relaxed">
                    <span className="font-medium text-[#1A1A1A]">{modal.doc.name}</span> will be permanently deleted. This cannot be undone.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setModal(null)} className="flex-1 py-3 rounded-xl border-2 border-[#E4E7EC] text-sm font-semibold text-[#667085]">Cancel</button>
                  <button onClick={confirmDelete} className="flex-1 py-3 rounded-xl bg-[#C4320A] text-sm font-semibold text-white">Delete</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
