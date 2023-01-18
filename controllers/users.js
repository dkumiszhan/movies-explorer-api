const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const InternalServerError = require('../middlewares/errors/internalServerError');
const BadRequestError = require('../middlewares/errors/badRequestError');
const NotFoundError = require('../middlewares/errors/notFoundError');
const UnauthorizedError = require('../middlewares/errors/unauthorized');
const ConflictError = require('../middlewares/errors/conflictError');

const BAD_REQUEST_MSG = 'Переданы некорректные данные';
const CONFLICT_MSG = 'Email занят';
const INTERNAL_SERVER_ERROR_MSG = 'Произошла ошибка на сервере';
const NOT_FOUND_MSG = 'Пользователь не найден';
const SIGNIN_ERROR_MSG = 'Неправильная почта или пароль';
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.send({ data: user });
  } catch (e) {
    next(new InternalServerError(INTERNAL_SERVER_ERROR_MSG));
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        email: req.body.email,
      },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      next(new NotFoundError(NOT_FOUND_MSG));
    } else {
      res.send(updatedUser);
    }
  } catch (e) {
    if (e.code === 11000) {
      next(new ConflictError(CONFLICT_MSG));
      return;
    }
    if (e.name === 'ValidationError') {
      next(new BadRequestError(BAD_REQUEST_MSG));
      return;
    }
    next(new InternalServerError(INTERNAL_SERVER_ERROR_MSG));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      next(new UnauthorizedError(SIGNIN_ERROR_MSG));
    } else {
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        next(new UnauthorizedError(SIGNIN_ERROR_MSG));
        return;
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ _id: user._id, token });
    }
  } catch (e) {
    next(new InternalServerError(INTERNAL_SERVER_ERROR_MSG));
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: passwordHash });
    const userJson = user.toObject();
    delete userJson.password;
    // Add JWT token field
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.send({ ...userJson, token });
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new BadRequestError(BAD_REQUEST_MSG));
      return;
    }
    if (e.code === 11000) {
      next(new ConflictError(CONFLICT_MSG));
      return;
    }
    next(new InternalServerError(INTERNAL_SERVER_ERROR_MSG));
  }
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  login,
  createUser,
};
