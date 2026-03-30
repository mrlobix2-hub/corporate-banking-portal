const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

exports.listAccounts = asyncHandler(async (_req, res) => {
  const result = await db.query('SELECT * FROM accounts ORDER BY created_at DESC');
  res.json(result.rows);
});

exports.createAccount = asyncHandler(async (req, res) => {
  const { account_name, bank_name, account_number, iban, swift_bic, sort_code, branch_code, currency, opening_balance } = req.body;
  const result = await db.query(
    `INSERT INTO accounts (account_name, bank_name, account_number, iban, swift_bic, sort_code, branch_code, currency, opening_balance)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [account_name, bank_name, account_number || null, iban || null, swift_bic || null, sort_code || null, branch_code || null, currency, opening_balance]
  );
  res.status(201).json(result.rows[0]);
});

exports.updateAccount = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const { account_name, bank_name, account_number, iban, swift_bic, sort_code, branch_code, currency, opening_balance } = req.body;
  const result = await db.query(
    `UPDATE accounts SET
      account_name=$1, bank_name=$2, account_number=$3, iban=$4, swift_bic=$5, sort_code=$6, branch_code=$7, currency=$8, opening_balance=$9, updated_at=NOW()
     WHERE id=$10 RETURNING *`,
    [account_name, bank_name, account_number || null, iban || null, swift_bic || null, sort_code || null, branch_code || null, currency, opening_balance, id]
  );
  if (!result.rows[0]) throw new ApiError(404, 'Account nahi mila');
  res.json(result.rows[0]);
});

exports.deleteAccount = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const tx = await db.query('SELECT 1 FROM transactions WHERE account_id = $1 LIMIT 1', [id]);
  if (tx.rows[0]) throw new ApiError(400, 'Is account me transactions mojood hain, delete nahi ho sakta');
  const result = await db.query('DELETE FROM accounts WHERE id = $1 RETURNING id', [id]);
  if (!result.rows[0]) throw new ApiError(404, 'Account nahi mila');
  res.json({ message: 'Account delete ho gaya' });
});
