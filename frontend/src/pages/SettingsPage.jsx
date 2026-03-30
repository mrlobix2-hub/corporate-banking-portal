import { useEffect, useState } from 'react';
import api from '../api/client';

export default function SettingsPage() {
  const [form, setForm] = useState({ app_name: 'Corporate Banking Portal', dashboard_title: 'Corporate Banking Portal', full_name: 'Raja Zahid Hussain', address_line_1: '480 Kings Street', city: 'Manchester', postal_code: 'M1 XXX', phone: '', iban: '', email: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/settings').then((res) => {
      if (res.data) setForm(res.data);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.put('/settings', form);
    setMsg('Settings save ho gayi hain');
  };

  return (
    <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-soft space-y-4 max-w-3xl">
      <h1 className="text-2xl font-semibold text-navy">Portal Settings</h1>
      {Object.entries(form).filter(([k]) => k !== 'id' && !k.endsWith('_at')).map(([key, value]) => (
        <div key={key}>
          <label className="mb-2 block text-sm font-medium">{key.replaceAll('_', ' ')}</label>
          <input value={value || ''} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
        </div>
      ))}
      {msg ? <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{msg}</div> : null}
      <button className="rounded-xl bg-navy px-5 py-3 text-white">Save Settings</button>
    </form>
  );
}
