import { useEffect, useState } from 'react';
import api from '../api/client';

export default function ExchangeRatesPage() {
  const [rates, setRates] = useState([]);
  const [form, setForm] = useState({ base_currency: 'GBP', target_currency: 'PKR', rate: '380' });

  const load = () => api.get('/exchange-rates').then((res) => setRates(res.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/exchange-rates', form);
    load();
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr,1.2fr]">
      <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-soft space-y-4">
        <h1 className="text-2xl font-semibold text-navy">Set Exchange Rate</h1>
        <select value={form.base_currency} onChange={(e) => setForm({ ...form, base_currency: e.target.value })}><option>GBP</option><option>PKR</option><option>USD</option><option>EUR</option></select>
        <select value={form.target_currency} onChange={(e) => setForm({ ...form, target_currency: e.target.value })}><option>GBP</option><option>PKR</option><option>USD</option><option>EUR</option></select>
        <input value={form.rate} onChange={(e) => setForm({ ...form, rate: e.target.value })} />
        <button className="rounded-xl bg-navy px-5 py-3 text-white">Save Rate</button>
      </form>
      <div className="rounded-2xl bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-semibold text-navy">Current Rates</h2>
        <div className="mt-4 overflow-auto">
          <table className="min-w-full text-sm">
            <thead><tr className="border-b text-left text-slate-500"><th className="py-3 pr-4">Base</th><th className="py-3 pr-4">Target</th><th className="py-3 pr-4 text-right">Rate</th></tr></thead>
            <tbody>{rates.map((r) => <tr key={r.id} className="border-b border-slate-100"><td className="py-3 pr-4">{r.base_currency}</td><td className="py-3 pr-4">{r.target_currency}</td><td className="py-3 pr-4 text-right">{Number(r.rate).toLocaleString()}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
