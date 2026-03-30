const express = require('express');
const { login, me, changePassword } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { authLimiter } = require('../middleware/rateLimiter');
const { loginValidator, changePasswordValidator } = require('../validators/authValidators');

const router = express.Router();
router.post('/login', authLimiter, loginValidator, validate, login);
router.get('/me', authMiddleware, me);
router.post('/change-password', authMiddleware, changePasswordValidator, validate, changePassword);
module.exports = router;
