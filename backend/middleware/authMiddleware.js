const db = require('../config/db');
const ApiError = require('../utils/ApiError');
const { verifyToken } = require('../utils/jwt');

module.exports = async (req, _res, next) => {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) {
      throw new ApiError(401, 'Unauthorized');
    }
    const token = header.replace('Bearer ', '');
    const decoded = verifyToken(token);
    const result = await db.query(
      'SELECT id, username, full_name, email, must_change_password FROM users WHERE id = $1',
      [decoded.userId]
    );
    if (!result.rows[0]) throw new ApiError(401, 'Session invalid');
    req.user = result.rows[0];
    next();
  } catch (error) {
    next(error.statusCode ? error : new ApiError(401, 'Session expired ya invalid'));
  }
};
