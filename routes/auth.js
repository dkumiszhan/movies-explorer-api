const express = require('express');

const { login, createUser } = require('../controllers/users');
const { signinValidator, signupValidator } = require('../validators');

const app = express();

app.post('/sign-in', signinValidator, login);

app.post('/sign-up', signupValidator, createUser);

module.exports = app;
