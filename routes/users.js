const express = require('express');
// const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const { getUserInfo, updateUserInfo } = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.use('/users', auth);
userRoutes.get('/users/me', getUserInfo);
userRoutes.patch('/users/me', updateUserInfo);

module.exports = { userRoutes };
