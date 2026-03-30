const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.getSettings = asyncHandler(async (_req, res) => {
  const result = await db.query('SELECT * FROM settings WHERE id = 1');
  res.json(result.rows[0]);
});

exports.updateSettings = asyncHandler(async (req, res) => {
  const { app_name, dashboard_title, full_name, address_line_1, city, postal_code, phone, iban, email } = req.body;
  const result = await db.query(
    `UPDATE settings SET
      app_name=COALESCE($1,app_name), dashboard_title=COALESCE($2,dashboard_title), full_name=COALESCE($3,full_name),
      address_line_1=COALESCE($4,address_line_1), city=COALESCE($5,city), postal_code=COALESCE($6,postal_code),
      phone=COALESCE($7,phone), iban=COALESCE($8,iban), email=COALESCE($9,email), updated_at=NOW()
     WHERE id=1 RETURNING *`,
    [app_name, dashboard_title, full_name, address_line_1, city, postal_code, phone, iban, email]
  );
  res.json(result.rows[0]);
});
