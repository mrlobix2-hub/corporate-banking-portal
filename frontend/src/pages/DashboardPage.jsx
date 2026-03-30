import { useEffect, useState } from 'react';
import api from '../api/client';
import StatCard from '../components/StatCard';

const money = (value) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(Number(value || 0));

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [showBalance, setShowBalance] = useState(true);

  useEffect(() => {
    api.get('/dashboard').then((res) => setData(res.data));
  }, []);

  if (!data) return <div className="rounded-2xl bg-white p-6 shadow-soft">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">Main Dashboard</p>
        <h1 className="text-3xl font-semibold text-navy">Corporate Banking Portal</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Balance" value={money(data.totals.total_balance)} visible={showBalance} onToggle={() => setShowBalance((v) => !v)} footer="Combined estimated total" />
        <StatCard title="Total Credit" value={money(data.totals.total_credit)} visible={showBalance} onToggle={() => setShowBalance((v) => !v)} />
        <StatCard title="Total Debit" value={money(data.totals.total_debit)} visible={showBalance} onToggle={() => setShowBalance((v) => !v)} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <section className="rounded-2xl bg-white p-5 shadow-soft">
          <h2 className="text-xl font-semibold text-navy">Recent Transactions</h2>
          <div className="mt-4 overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b text-left text-slate-500">
                  <th className="py-3 pr-4">Date</th>
                  <th className="py-3 pr-4">Transaction ID</th>
                  <th className="py-3 pr-4">Account</th>
                  <th className="py-3 pr-4">Type</th>
                  <th className="py-3 pr-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-slate-100">
                    <td className="py-3 pr-4">{tx.transaction_date?.slice(0, 10)}</td>
                    <td className="py-3 pr-4">{tx.transaction_id}</td>
                    <td className="py-3 pr-4">{tx.account_name}</td>
                    <td className="py-3 pr-4">{tx.type}</td>
                    <td className="py-3 pr-4 text-right">{Number(tx.amount).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="rounded-2xl bg-white p-5 shadow-soft">
          <h2 className="text-xl font-semibold text-navy">Currency Balances</h2>
          <div className="mt-4 space-y-3">
            {Object.entries(data.balances_by_currency).map(([currency, value]) => (
              <div key={currency} className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
                <span className="font-medium">{currency}</span>
                <span>{Number(value).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
