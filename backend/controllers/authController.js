const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { comparePassword, hashPassword, checkPasswordStrength } = require('../utils/password');
const { signToken } = require('../utils/jwt');

exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  const user = result.rows[0];
  if (!user) throw new ApiError(401, 'Login ID ya password ghalat hai');

  const ok = await comparePassword(password, user.password_hash);
  if (!ok) throw new ApiError(401, 'Login ID ya password ghalat hai');

  const token = signToken({ userId: user.id, username: user.username });
  await db.query('UPDATE users SET last_login_at = NOW(), updated_at = NOW() WHERE id = $1', [user.id]);

  res.json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      email: user.email,
      must_change_password: user.must_change_password
    }
  });
});

exports.me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const result = await db.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
  const user = result.rows[0];
  if (!user) throw new ApiError(404, 'User nahi mila');

  const ok = await comparePassword(currentPassword, user.password_hash);
  if (!ok) throw new ApiError(400, 'Current password ghalat hai');

  const strength = checkPasswordStrength(newPassword);
  if (!strength.valid) throw new ApiError(400, 'Naya password strong nahi hai', strength.checks);

  const newHash = await hashPassword(newPassword);
  await db.query(
    'UPDATE users SET password_hash = $1, must_change_password = FALSE, updated_at = NOW() WHERE id = $2',
    [newHash, req.user.id]
  );

  res.json({ message: 'Password successfully change ho gaya' });
});
