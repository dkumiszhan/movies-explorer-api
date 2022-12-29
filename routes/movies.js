const express = require('express');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieValidator, deleteMovieValidator } = require('../validators');

const movieRoutes = express.Router();

movieRoutes.get('/movies', getMovies);
movieRoutes.post('/movies', movieValidator, createMovie);

movieRoutes.delete('/movies/:movieId', deleteMovieValidator, deleteMovie);

module.exports = movieRoutes;
