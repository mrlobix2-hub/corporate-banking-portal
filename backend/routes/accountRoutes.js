const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const validator = require('../validators/accountValidators');
const controller = require('../controllers/accountController');

const router = express.Router();
router.use(authMiddleware);
router.get('/', controller.listAccounts);
router.post('/', validator, validate, controller.createAccount);
router.put('/:id', validator, validate, controller.updateAccount);
router.delete('/:id', controller.deleteAccount);
module.exports = router;
