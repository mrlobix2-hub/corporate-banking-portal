const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { upload, uploadReceipt, getReceipt, downloadReceipt } = require('../controllers/receiptController');

const router = express.Router();
router.use(authMiddleware);
router.post('/', upload.single('receipt'), uploadReceipt);
router.get('/:id', getReceipt);
router.get('/:id/download', downloadReceipt);
module.exports = router;
