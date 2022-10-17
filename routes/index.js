const express = require('express');
const movieRoutes = require('./movies');
const userRoutes = require('./users');
const auth = require('../middlewares/auth');
const authRoutes = require('./auth');

const app = express();
app.use(authRoutes);
app.use(auth);
app.use(movieRoutes);
app.use(userRoutes);

module.exports = app;
