const express = require('express');

const { login, createUser } = require('../controllers/users');
const { signinValidator, signupValidator } = require('../validators');

const app = express();

app.post('/signin', signinValidator, login);

app.post('/signup', signupValidator, createUser);

module.exports = app;
