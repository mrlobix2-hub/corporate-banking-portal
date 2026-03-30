const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.exportJson = asyncHandler(async (_req, res) => {
  const result = await db.query('SELECT * FROM transactions ORDER BY transaction_date DESC, id DESC');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="transactions-backup.json"');
  res.send(JSON.stringify(result.rows, null, 2));
});

exports.exportCsv = asyncHandler(async (_req, res) => {
  const result = await db.query('SELECT * FROM transactions ORDER BY transaction_date DESC, id DESC');
  const rows = result.rows;
  const keys = rows[0] ? Object.keys(rows[0]) : [];
  const csv = [keys.join(',')].concat(rows.map((row) => keys.map((k) => JSON.stringify(row[k] ?? '')).join(','))).join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="transactions-export.csv"');
  res.send(csv);
});
