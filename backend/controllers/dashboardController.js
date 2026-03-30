const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.getDashboard = asyncHandler(async (_req, res) => {
  const totals = await db.query(`
    SELECT
      COALESCE(SUM(CASE WHEN type = 'Credit' THEN amount ELSE 0 END), 0) AS total_credit,
      COALESCE(SUM(CASE WHEN type = 'Debit' THEN amount ELSE 0 END), 0) AS total_debit
    FROM transactions
  `);

  const accounts = await db.query(`
    SELECT a.*, COALESCE(SUM(CASE WHEN t.type='Credit' THEN t.amount WHEN t.type='Debit' THEN -t.amount ELSE 0 END),0) - COALESCE(SUM(t.fee),0) AS movement
    FROM accounts a
    LEFT JOIN transactions t ON t.account_id = a.id
    GROUP BY a.id
    ORDER BY a.created_at DESC
  `);

  const recent = await db.query(`
    SELECT t.*, a.account_name FROM transactions t
    JOIN accounts a ON a.id = t.account_id
    ORDER BY t.transaction_date DESC, t.id DESC
    LIMIT 8
  `);

  const balancesByCurrency = {};
  let totalBalance = 0;

  for (const a of accounts.rows) {
    const current = Number(a.opening_balance) + Number(a.movement);
    totalBalance += current;
    balancesByCurrency[a.currency] = (balancesByCurrency[a.currency] || 0) + current;
    a.current_balance = current;
  }

  res.json({
    totals: {
      total_balance: totalBalance,
      total_credit: Number(totals.rows[0].total_credit),
      total_debit: Number(totals.rows[0].total_debit)
    },
    balances_by_currency: balancesByCurrency,
    accounts: accounts.rows,
    recent_transactions: recent.rows
  });
});
