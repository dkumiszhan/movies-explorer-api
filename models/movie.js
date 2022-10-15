const mongoose = require('mongoose');
// const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function validate(v) {
        return /^https?:\/\/(www\.)?[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=-]+\.[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=-]+#?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  trailerLink: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: function validate(v) {
        return /^https?:\/\/(www\.)?[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=-]+\.[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=-]+#?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: false,
  },
  thumbnail: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: function validate(v) {
        return /^https?:\/\/(www\.)?[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=-]+\.[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=-]+#?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // movieId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user',
  //   required: true,
  // },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
