const { body } = require('express-validator');

const loginValidator = [
  body('username').trim().notEmpty().withMessage('Login ID required hai'),
  body('password').notEmpty().withMessage('Password required hai')
];

const changePasswordValidator = [
  body('currentPassword').notEmpty().withMessage('Current password required hai'),
  body('newPassword')
    .isLength({ min: 10 }).withMessage('Password kam az kam 10 characters ka ho')
    .matches(/[A-Z]/).withMessage('Uppercase letter zaroori hai')
    .matches(/[a-z]/).withMessage('Lowercase letter zaroori hai')
    .matches(/\d/).withMessage('Number zaroori hai')
    .matches(/[^A-Za-z0-9]/).withMessage('Special character zaroori hai')
];

module.exports = { loginValidator, changePasswordValidator };
