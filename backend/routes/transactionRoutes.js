const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const validator = require('../validators/transactionValidators');
const controller = require('../controllers/transactionController');

const router = express.Router();
router.use(authMiddleware);
router.get('/', controller.listTransactions);
router.get('/:id', controller.getTransaction);
router.post('/', validator, validate, controller.createTransaction);
router.put('/:id', validator, validate, controller.updateTransaction);
router.delete('/:id', controller.deleteTransaction);
module.exports = router;
