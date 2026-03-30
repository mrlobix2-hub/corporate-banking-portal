const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

exports.listRates = asyncHandler(async (_req, res) => {
  const result = await db.query('SELECT * FROM exchange_rates ORDER BY base_currency, target_currency');
  res.json(result.rows);
});

exports.upsertRate = asyncHandler(async (req, res) => {
  const { base_currency, target_currency, rate } = req.body;
  if (base_currency === target_currency) throw new ApiError(400, 'Currencies same nahi ho sakti');
  const result = await db.query(
    `INSERT INTO exchange_rates (base_currency, target_currency, rate)
     VALUES ($1,$2,$3)
     ON CONFLICT (base_currency, target_currency)
     DO UPDATE SET rate = EXCLUDED.rate, updated_at = NOW()
     RETURNING *`,
    [base_currency, target_currency, rate]
  );
  res.json(result.rows[0]);
});
