import { LayoutDashboard, Landmark, ArrowLeftRight, Settings, LogOut, TrendingUp } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/accounts', label: 'Accounts', icon: Landmark },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/exchange-rates', label: 'Exchange Rates', icon: TrendingUp },
  { to: '/settings', label: 'Settings', icon: Settings }
];

export default function Sidebar() {
  const { logout } = useAuth();
  return (
    <aside className="w-full lg:w-72 bg-navy text-white min-h-screen p-6">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Corporate Suite</p>
        <h1 className="mt-3 text-2xl font-semibold">Corporate Banking Portal</h1>
        <p className="mt-2 text-sm text-slate-300">Professional personal finance ledger</p>
      </div>
      <nav className="space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 ${isActive ? 'bg-white text-navy' : 'text-slate-200 hover:bg-slatebank'}`}>
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>
      <button onClick={logout} className="mt-8 flex items-center gap-3 rounded-xl border border-white/20 px-4 py-3 text-slate-100 hover:bg-slatebank">
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}
