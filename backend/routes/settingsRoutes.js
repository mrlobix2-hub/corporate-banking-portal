const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const validator = require('../validators/settingsValidators');
const controller = require('../controllers/settingsController');

const router = express.Router();
router.use(authMiddleware);
router.get('/', controller.getSettings);
router.put('/', validator, validate, controller.updateSettings);
module.exports = router;
