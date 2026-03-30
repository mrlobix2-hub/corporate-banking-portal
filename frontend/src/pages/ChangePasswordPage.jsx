import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../contexts/AuthContext';

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const { refreshMe, logout } = useAuth();
  const [form, setForm] = useState({ currentPassword: 'Ipconfig786@aaa', newPassword: '' });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    try {
      await api.post('/auth/change-password', form);
      await refreshMe();
      setMsg('Password successfully change ho gaya. Ab dashboard open ho raha hai.');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Password change fail ho gaya');
    }
  };

  return (
    <div className="min-h-screen bg-mist flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-semibold text-navy">First Login Password Change</h1>
        <p className="mt-3 text-sm text-slate-500">Security ke liye pehli login par password change lazmi hai.</p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Current Password</label>
            <input type="password" value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">New Strong Password</label>
            <input type="password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} placeholder="Example: MyNewPass@123" />
          </div>
          {msg ? <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{msg}</div> : null}
          {error ? <div className="rounded-xl bg-red-50 p-3 text-sm text-danger">{error}</div> : null}
          <div className="flex gap-3">
            <button className="rounded-xl bg-navy px-5 py-3 font-medium text-white">Save Password</button>
            <button type="button" onClick={logout} className="rounded-xl border border-slate-200 px-5 py-3">Logout</button>
          </div>
        </form>
      </div>
    </div>
  );
}
