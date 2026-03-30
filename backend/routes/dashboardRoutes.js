const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const controller = require('../controllers/dashboardController');

const router = express.Router();
router.use(authMiddleware);
router.get('/', controller.getDashboard);
module.exports = router;
