import { useEffect, useState } from 'react';
import api from '../api/client';

const blank = {
  account_id: '', transaction_id: '', reference_number: '', from_bank: '', to_bank: '', person_name: '', iban: '', swift: '', sort_code: '', branch_code: '',
  currency_sent: 'GBP', currency_received: 'PKR', exchange_rate: '380', amount: '0', fee: '0', type: 'Debit', category: 'Remittance', transaction_date: new Date().toISOString().slice(0,10), notes: ''
};

export default function TransactionsPage() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState(blank);

  const load = async () => {
    const [a, t] = await Promise.all([api.get('/accounts'), api.get('/transactions')]);
    setAccounts(a.data);
    setTransactions(t.data);
    if (!form.account_id && a.data[0]) setForm((prev) => ({ ...prev, account_id: String(a.data[0].id) }));
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/transactions', form);
    setForm((prev) => ({ ...blank, account_id: prev.account_id || '' }));
    load();
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
      <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-soft space-y-4">
        <h1 className="text-2xl font-semibold text-navy">Add Transaction</h1>
        <div>
          <label className="mb-2 block text-sm font-medium">Account</label>
          <select value={form.account_id} onChange={(e) => setForm({ ...form, account_id: e.target.value })}>
            {accounts.map((a) => <option key={a.id} value={a.id}>{a.account_name}</option>)}
          </select>
        </div>
        {Object.entries(form).filter(([k]) => k !== 'account_id').map(([key, value]) => (
          <div key={key}>
            <label className="mb-2 block text-sm font-medium">{key.replaceAll('_', ' ')}</label>
            {['type'].includes(key) ? (
              <select value={value} onChange={(e) => setForm({ ...form, [key]: e.target.value })}><option>Credit</option><option>Debit</option></select>
            ) : ['category'].includes(key) ? (
              <select value={value} onChange={(e) => setForm({ ...form, [key]: e.target.value })}><option>Cash</option><option>Bank Transfer</option><option>International Transfer</option><option>Remittance</option><option>Deposit</option><option>Withdrawal</option><option>Adjustment</option></select>
            ) : ['currency_sent','currency_received'].includes(key) ? (
              <select value={value} onChange={(e) => setForm({ ...form, [key]: e.target.value })}><option>GBP</option><option>PKR</option><option>USD</option><option>EUR</option></select>
            ) : (
              <input value={value} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
            )}
          </div>
        ))}
        <button className="rounded-xl bg-navy px-5 py-3 text-white">Save Transaction</button>
      </form>
      <div className="rounded-2xl bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-semibold text-navy">Transactions</h2>
        <div className="mt-4 overflow-auto">
          <table className="min-w-full text-sm">
            <thead><tr className="border-b text-left text-slate-500"><th className="py-3 pr-4">Date</th><th className="py-3 pr-4">ID</th><th className="py-3 pr-4">Type</th><th className="py-3 pr-4">Category</th><th className="py-3 pr-4 text-right">Amount</th></tr></thead>
            <tbody>{transactions.map((t) => <tr key={t.id} className="border-b border-slate-100"><td className="py-3 pr-4">{t.transaction_date?.slice(0,10)}</td><td className="py-3 pr-4">{t.transaction_id}</td><td className="py-3 pr-4">{t.type}</td><td className="py-3 pr-4">{t.category}</td><td className="py-3 pr-4 text-right">{Number(t.amount).toLocaleString()}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
