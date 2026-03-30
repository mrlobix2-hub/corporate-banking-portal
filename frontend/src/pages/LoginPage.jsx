import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: 'MFCB0329', password: 'Ipconfig786@aaa' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await login(form);
      navigate(user.must_change_password ? '/change-password' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login fail ho gaya');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-slatebank to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-soft">
        <p className="text-sm font-medium text-slate-500">Welcome back</p>
        <h1 className="mt-2 text-3xl font-semibold text-navy">Corporate Banking Portal</h1>
        <p className="mt-3 text-sm text-slate-500">Default Login ID: <strong>MFCB0329</strong></p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Login ID</label>
            <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          {error ? <div className="rounded-xl bg-red-50 p-3 text-sm text-danger">{error}</div> : null}
          <button className="w-full rounded-xl bg-navy px-4 py-3 font-medium text-white hover:opacity-95" disabled={loading}>
            {loading ? 'Please wait...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
