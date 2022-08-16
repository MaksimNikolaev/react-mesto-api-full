const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const error = require('./middlewares/error');
const routes = require('./routes/index');
const NotFoundError = require('./errors/Not-found-err');

const app = express();
const { PORT = 3000 } = process.env;

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use(routes);

app.use(errors()); // обработчик ошибок celebrate

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(error);

app.listen(PORT);
