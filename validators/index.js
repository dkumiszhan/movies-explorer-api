const { celebrate, Joi } = require('celebrate');

const userInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const movieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/^https?:\/\/(www\.)?[A-Za-z0-9._~:/?[\]@!$&'()*+,;=-]+\.[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=-]+#?$/),
    trailerLink: Joi.string().required().pattern(/^https?:\/\/(www\.)?[A-Za-z0-9._~:/?[\]@!$&'()*+,;=-]+\.[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=-]+#?$/),
    thumbnail: Joi.string().required().pattern(/^https?:\/\/(www\.)?[A-Za-z0-9._~:/?[\]@!$&'()*+,;=-]+\.[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=-]+#?$/),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }),
});

const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[A-Za-z0-9._~:/?[\]@!$&'()*+,;=-]+\.[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=-]+#?$/),
  }),
});

module.exports = {
  userInfoValidator,
  movieValidator,
  deleteMovieValidator,
  signinValidator,
  signupValidator,
};
