const { body } = require('express-validator');

module.exports = [
  body('app_name').optional().trim().notEmpty(),
  body('dashboard_title').optional().trim().notEmpty(),
  body('full_name').optional().trim().notEmpty(),
  body('email').optional().isEmail().withMessage('Email valid honi chahiye')
];
