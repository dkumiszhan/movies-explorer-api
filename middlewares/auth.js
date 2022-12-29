require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('./errors/unauthorized');

const UNAUTHORIZED_MSG = 'Ошибка авторизации';
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(UNAUTHORIZED_MSG));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    next(new UnauthorizedError(UNAUTHORIZED_MSG));
  }
  req.user = payload;
  next();
}

module.exports = auth;
