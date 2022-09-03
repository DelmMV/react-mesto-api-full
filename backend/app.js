const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {
  celebrate,
  Joi,
} = require('celebrate');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const {
  createUser,
  login,
} = require('./controllers/users');
const error = require('./middlewares/errors');
const NotFoundError = require('./utils/not-found-error');
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: {
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required(),
    name: Joi.string()
      .min(2)
      .max(30),
    about: Joi.string()
      .min(2)
      .max(30),
    avatar: Joi.string()
      .regex(/^http(s)?:\/\/((www.)?([\w-]+\.)+\/?)\S*$/),
  },
}), createUser);

app.post('/signin', celebrate({
  body: {
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required(),
  },
}), login);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
