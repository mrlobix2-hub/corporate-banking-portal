const { body } = require('express-validator');

module.exports = [
  body('account_name').trim().notEmpty().withMessage('Account name required hai'),
  body('bank_name').trim().notEmpty().withMessage('Bank name required hai'),
  body('currency').isIn(['GBP', 'PKR', 'USD', 'EUR']).withMessage('Currency invalid hai'),
  body('opening_balance').isFloat().withMessage('Opening balance number hona chahiye')
];
