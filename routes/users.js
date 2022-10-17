const express = require('express');
const { celebrate, Joi } = require('celebrate');

const { getUserInfo, updateUserInfo } = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/users/me', getUserInfo);
userRoutes.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
}), updateUserInfo);

module.exports = userRoutes;
