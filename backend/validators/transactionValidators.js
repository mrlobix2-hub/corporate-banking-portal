const { body } = require('express-validator');

module.exports = [
  body('account_id').isInt().withMessage('Account select karein'),
  body('transaction_id').trim().notEmpty().withMessage('Transaction ID required hai'),
  body('reference_number').trim().notEmpty().withMessage('Reference number required hai'),
  body('type').isIn(['Credit', 'Debit']).withMessage('Type Credit ya Debit ho'),
  body('category').isIn(['Cash', 'Bank Transfer', 'International Transfer', 'Remittance', 'Deposit', 'Withdrawal', 'Adjustment']).withMessage('Category invalid hai'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount valid hona chahiye'),
  body('transaction_date').isISO8601().withMessage('Date valid honi chahiye')
];
