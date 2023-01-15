require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('./errors/unauthorized');

const UNAUTHORIZED_MSG = 'Ошибка авторизации';
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

function auth(req, res, next) {
  console.log('auth here');
  const { authorization } = req.headers;
  console.log(`authorization is ${JSON.stringify(authorization)}`);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(UNAUTHORIZED_MSG));
    return;
  }
  console.log('get token');
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    console.log(e);
    next(new UnauthorizedError(UNAUTHORIZED_MSG));
  }
  req.user = payload;
  next();
}

module.exports = auth;
