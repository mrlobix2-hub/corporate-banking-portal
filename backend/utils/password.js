const bcrypt = require('bcrypt');
const env = require('../config/env');

const checkPasswordStrength = (password) => {
  const checks = {
    minLength: password.length >= 10,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };
  return { valid: Object.values(checks).every(Boolean), checks };
};

const hashPassword = (password) => bcrypt.hash(password, env.bcryptRounds);
const comparePassword = (password, hash) => bcrypt.compare(password, hash);

module.exports = { checkPasswordStrength, hashPassword, comparePassword };
