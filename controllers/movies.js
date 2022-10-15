const Movie = require('../models/movie');
const InternalServerError = require('../middlewares/errors/internalServerError');
const BadRequestError = require('../middlewares/errors/badRequestError');
const NotFoundError = require('../middlewares/errors/notFoundError');
const ForbiddenError = require('../middlewares/errors/forbiddenError');

const BAD_REQUEST_MSG = 'Переданы некорректные данные';
const INTERNAL_SERVER_ERROR_MSG = 'Произошла ошибка на сервере';
const NOT_FOUND_MSG = 'Карточка не найдена';
const FORBIDDEN_MSG = 'Ошибка прав';

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({}).sort('-createdAt');
    res.send(movies);
  } catch (e) {
    next(new InternalServerError(INTERNAL_SERVER_ERROR_MSG));
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
    } = req.body;
    const movie = await new Movie({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      owner: req.user._id,
    }).save();
    // console.log(movie);
    res.send(movie);
  } catch (e) {
    console.log(e);
    if (e.name === 'ValidationError') {
      next(new BadRequestError(BAD_REQUEST_MSG));
      return;
    }
    next(new InternalServerError(INTERNAL_SERVER_ERROR_MSG));
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movieToDelete = await Movie.findById(req.params.movieId);
    console.log(movieToDelete);
    if (!movieToDelete) {
      next(new NotFoundError(NOT_FOUND_MSG));
    } else if (movieToDelete.owner.toString() === req.user._id) {
      await movieToDelete.remove();
      res.send(movieToDelete);
      return;
    } else {
      next(new ForbiddenError(FORBIDDEN_MSG));
    }
  } catch (e) {
    console.log(e);
    if (e.name === 'CastError') {
      next(new BadRequestError(BAD_REQUEST_MSG));
      return;
    }
    next(new InternalServerError(INTERNAL_SERVER_ERROR_MSG));
  }
};

module.exports = { getMovies, createMovie, deleteMovie };
