const { body } = require('express-validator');

module.exports = [
  body('base_currency').isIn(['GBP', 'PKR', 'USD', 'EUR']),
  body('target_currency').isIn(['GBP', 'PKR', 'USD', 'EUR']),
  body('rate').isFloat({ gt: 0 }).withMessage('Rate zero se bara ho')
];
