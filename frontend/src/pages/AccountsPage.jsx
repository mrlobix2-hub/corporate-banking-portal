import { useEffect, useState } from 'react';
import api from '../api/client';

const initial = { account_name: '', bank_name: '', account_number: '', iban: '', swift_bic: '', sort_code: '', branch_code: '', currency: 'GBP', opening_balance: '0' };

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState(initial);

  const load = () => api.get('/accounts').then((res) => setAccounts(res.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/accounts', form);
    setForm(initial);
    load();
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
      <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-soft space-y-4">
        <h1 className="text-2xl font-semibold text-navy">Add Account</h1>
        {Object.entries(form).map(([key, value]) => key === 'currency' ? (
          <div key={key}>
            <label className="mb-2 block text-sm font-medium">Currency</label>
            <select value={value} onChange={(e) => setForm({ ...form, currency: e.target.value })}>
              <option>GBP</option><option>PKR</option><option>USD</option><option>EUR</option>
            </select>
          </div>
        ) : (
          <div key={key}>
            <label className="mb-2 block text-sm font-medium">{key.replaceAll('_', ' ')}</label>
            <input value={value} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
          </div>
        ))}
        <button className="rounded-xl bg-navy px-5 py-3 text-white">Save Account</button>
      </form>
      <div className="rounded-2xl bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-semibold text-navy">All Accounts</h2>
        <div className="mt-4 overflow-auto">
          <table className="min-w-full text-sm">
            <thead><tr className="border-b text-left text-slate-500"><th className="py-3 pr-4">Name</th><th className="py-3 pr-4">Bank</th><th className="py-3 pr-4">Currency</th><th className="py-3 pr-4 text-right">Opening</th></tr></thead>
            <tbody>
              {accounts.map((a) => <tr key={a.id} className="border-b border-slate-100"><td className="py-3 pr-4">{a.account_name}</td><td className="py-3 pr-4">{a.bank_name}</td><td className="py-3 pr-4">{a.currency}</td><td className="py-3 pr-4 text-right">{Number(a.opening_balance).toLocaleString()}</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
