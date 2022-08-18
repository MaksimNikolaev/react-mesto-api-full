const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const error = require('./middlewares/error');
const routes = require('./routes/index');
const NotFoundError = require('./errors/Not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;
const options = {
  origin: [
    'http://localhost:3000',
    'http://mesto.nikolaev.nomoredomains.sbs/',
    'https://mesto.nikolaev.nomoredomains.sbs/',
    'http://api.mesto.nikolaev.nomoredomains.sbs/',
    'https://api.mesto.nikolaev.nomoredomains.sbs/',
  ],
  credentials: true,
};

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов

app.use(cors(options));

app.use(routes); // подключаем роуты

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(error);

app.listen(PORT);
