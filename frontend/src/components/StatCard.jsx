import { Eye, EyeOff } from 'lucide-react';

export default function StatCard({ title, value, visible, onToggle, footer }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-soft border border-slate-100">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-3 text-2xl font-semibold text-navy">{visible ? value : '******'}</h3>
        </div>
        <button onClick={onToggle} className="rounded-xl border border-slate-200 p-2 hover:bg-slate-50">
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {footer ? <p className="mt-4 text-xs text-slate-500">{footer}</p> : null}
    </div>
  );
}
