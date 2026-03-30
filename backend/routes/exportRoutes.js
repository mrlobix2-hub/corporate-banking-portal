const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const controller = require('../controllers/exportController');

const router = express.Router();
router.use(authMiddleware);
router.get('/json', controller.exportJson);
router.get('/csv', controller.exportCsv);
module.exports = router;
