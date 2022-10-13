const express = require('express');
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

const movieRoutes = express.Router();

movieRoutes.use('/movies', auth);
movieRoutes.get('/movies', getMovies);
movieRoutes.post('/movies', createMovie);
movieRoutes.delete('/movies/_id', deleteMovie);

module.exports = { movieRoutes };