const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

async function recalc(accountId) {
  const account = await db.query('SELECT opening_balance FROM accounts WHERE id = $1', [accountId]);
  let balance = Number(account.rows[0]?.opening_balance || 0);
  const tx = await db.query('SELECT id, type, amount, fee FROM transactions WHERE account_id = $1 ORDER BY transaction_date ASC, id ASC', [accountId]);
  for (const row of tx.rows) {
    balance += row.type === 'Credit' ? Number(row.amount) : -Number(row.amount);
    balance -= Number(row.fee || 0);
    await db.query('UPDATE transactions SET running_balance = $1 WHERE id = $2', [balance, row.id]);
  }
}

exports.listTransactions = asyncHandler(async (_req, res) => {
  const result = await db.query(`SELECT t.*, a.account_name FROM transactions t JOIN accounts a ON a.id=t.account_id ORDER BY t.transaction_date DESC, t.id DESC`);
  res.json(result.rows);
});

exports.getTransaction = asyncHandler(async (req, res) => {
  const result = await db.query('SELECT * FROM transactions WHERE id = $1', [Number(req.params.id)]);
  if (!result.rows[0]) throw new ApiError(404, 'Transaction nahi mila');
  res.json(result.rows[0]);
});

exports.createTransaction = asyncHandler(async (req, res) => {
  const {
    account_id, transaction_id, reference_number, from_bank, to_bank, person_name, iban, swift, sort_code, branch_code,
    currency_sent, currency_received, exchange_rate, amount, fee, type, category, transaction_date, notes, receipt_id, manual_received_amount
  } = req.body;

  const received = manual_received_amount || ((currency_sent === 'GBP' && currency_received === 'PKR' && exchange_rate) ? Number(amount) * Number(exchange_rate) : Number(amount));

  const result = await db.query(
    `INSERT INTO transactions (
      account_id, transaction_id, reference_number, from_bank, to_bank, person_name, iban, swift, sort_code, branch_code,
      currency_sent, currency_received, exchange_rate, amount, fee, type, category, transaction_date, notes, receipt_id, manual_received_amount
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21
    ) RETURNING *`,
    [account_id, transaction_id, reference_number, from_bank || null, to_bank || null, person_name || null, iban || null, swift || null, sort_code || null, branch_code || null, currency_sent, currency_received, exchange_rate || null, amount, fee || 0, type, category, transaction_date, notes || null, receipt_id || null, received]
  );

  await recalc(account_id);
  const fresh = await db.query('SELECT * FROM transactions WHERE id = $1', [result.rows[0].id]);
  res.status(201).json(fresh.rows[0]);
});

exports.updateTransaction = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const old = await db.query('SELECT * FROM transactions WHERE id = $1', [id]);
  if (!old.rows[0]) throw new ApiError(404, 'Transaction nahi mila');

  const {
    account_id, transaction_id, reference_number, from_bank, to_bank, person_name, iban, swift, sort_code, branch_code,
    currency_sent, currency_received, exchange_rate, amount, fee, type, category, transaction_date, notes, receipt_id, manual_received_amount
  } = req.body;

  const received = manual_received_amount || ((currency_sent === 'GBP' && currency_received === 'PKR' && exchange_rate) ? Number(amount) * Number(exchange_rate) : Number(amount));

  const result = await db.query(
    `UPDATE transactions SET
      account_id=$1, transaction_id=$2, reference_number=$3, from_bank=$4, to_bank=$5, person_name=$6, iban=$7, swift=$8,
      sort_code=$9, branch_code=$10, currency_sent=$11, currency_received=$12, exchange_rate=$13, amount=$14, fee=$15,
      type=$16, category=$17, transaction_date=$18, notes=$19, receipt_id=$20, manual_received_amount=$21, updated_at=NOW()
     WHERE id=$22 RETURNING *`,
    [account_id, transaction_id, reference_number, from_bank || null, to_bank || null, person_name || null, iban || null, swift || null, sort_code || null, branch_code || null, currency_sent, currency_received, exchange_rate || null, amount, fee || 0, type, category, transaction_date, notes || null, receipt_id || null, received, id]
  );

  await recalc(old.rows[0].account_id);
  if (Number(old.rows[0].account_id) !== Number(account_id)) await recalc(account_id);
  res.json(result.rows[0]);
});

exports.deleteTransaction = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const existing = await db.query('SELECT * FROM transactions WHERE id = $1', [id]);
  if (!existing.rows[0]) throw new ApiError(404, 'Transaction nahi mila');
  await db.query('DELETE FROM transactions WHERE id = $1', [id]);
  await recalc(existing.rows[0].account_id);
  res.json({ message: 'Transaction delete ho gaya' });
});
