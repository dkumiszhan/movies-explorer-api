const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const notFoundHandler = require('./routes/notFound');
const errorHandler = require('./middlewares/errors/errors');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

const CORS_WHITELIST = process.env.CORS_WHITELIST || 'http://localhost:3000 http://localhost:3001';

const corsOptions = {
  origin: CORS_WHITELIST.split(' '),
};
app.use(cors(corsOptions));
// console.log(process.env);

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/moviedb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(requestLogger);
app.use(routes);
app.use(notFoundHandler);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
