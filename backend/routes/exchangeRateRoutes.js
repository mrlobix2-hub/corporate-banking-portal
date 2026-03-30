const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const validator = require('../validators/exchangeRateValidators');
const controller = require('../controllers/exchangeRateController');

const router = express.Router();
router.use(authMiddleware);
router.get('/', controller.listRates);
router.post('/', validator, validate, controller.upsertRate);
module.exports = router;
