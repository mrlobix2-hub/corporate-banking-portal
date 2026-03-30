const fs = require('fs');
const multer = require('multer');
const path = require('path');
const env = require('../config/env');
const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

fs.mkdirSync(path.resolve(env.uploadDir), { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.resolve(env.uploadDir)),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`)
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (['image/png', 'image/jpeg', 'application/pdf'].includes(file.mimetype)) return cb(null, true);
    cb(new Error('Sirf PNG, JPG, PDF allowed hain'));
  }
});

const uploadReceipt = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'Receipt file required hai');
  const result = await db.query(
    `INSERT INTO receipts (original_name, stored_name, mime_type, file_path, file_size)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [req.file.originalname, req.file.filename, req.file.mimetype, req.file.path, req.file.size]
  );
  res.status(201).json(result.rows[0]);
});

const getReceipt = asyncHandler(async (req, res) => {
  const result = await db.query('SELECT * FROM receipts WHERE id = $1', [Number(req.params.id)]);
  if (!result.rows[0]) throw new ApiError(404, 'Receipt nahi mili');
  res.json(result.rows[0]);
});

const downloadReceipt = asyncHandler(async (req, res) => {
  const result = await db.query('SELECT * FROM receipts WHERE id = $1', [Number(req.params.id)]);
  if (!result.rows[0]) throw new ApiError(404, 'Receipt nahi mili');
  res.download(path.resolve(result.rows[0].file_path), result.rows[0].original_name);
});

module.exports = { upload, uploadReceipt, getReceipt, downloadReceipt };
