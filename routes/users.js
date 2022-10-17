const express = require('express');

const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { userInfoValidator } = require('../validators');

const userRoutes = express.Router();

userRoutes.get('/users/me', getUserInfo);
userRoutes.patch('/users/me', userInfoValidator, updateUserInfo);

module.exports = userRoutes;
