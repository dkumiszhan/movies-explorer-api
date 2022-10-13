const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { userRoutes } = require('./routes/users');
const { movieRoutes } = require('./routes/movies');
const notFoundHandler = require('./routes/notFound');
const errorHandler = require('./middlewares/errors/errors');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

const CORS_WHITELIST = process.env.CORS_WHITELIST || 'http://localhost:3000 http://localhost:3001';

const corsOptions = {
  origin: CORS_WHITELIST.split(' '),
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.post('/signup', createUser);
app.post('/signin', login);
app.use(requestLogger);
app.use(userRoutes);
app.use(movieRoutes);
app.use(errorLogger);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
