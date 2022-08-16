const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/Not-found-err');
const Unauthorized = require('../errors/Unauthorized-err');
const BadRequest = require('../errors/Bad-request-err');
const InternalServerError = require('../errors/Internal-server-err');
const ConflictError = require('../errors/Conflict-err');

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new Unauthorized('Неправильные почта или пароль.'));
    }
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return next(new Unauthorized('Неправильные почта или пароль.'));
    }
    const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
    return res.send({ token });
  } catch (err) {
    return next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      next(new NotFoundError('Пользователь по указанному _id не найден.'));
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hashPassword,
    });
    res.send({
      user: {
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError('Такой Email уже существует'));
    } else {
      next(err);
    }
  }
};

module.exports.getUsersById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      next(new NotFoundError('Пользователь по указанному _id не найден'));
      return;
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest(`Переданы некорректные данные ${err}`));
      return;
    }
    next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

module.exports.updateProfile = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true, // обработчик получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
        upsert: false, // если пользователь не найден, он будет создан
      },
    );
    if (!user) {
      next(new NotFoundError('Пользователь по указанному _id не найден'));
      return;
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('Переданы некорректные данные при обновлении профиля.'));
      return;
    }
    if (err.name === 'ValidationError') {
      next(new BadRequest('Переданы некорректные данные при обновлении профиля.'));
      return;
    }
    next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true, // обработчик получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
        upsert: false, // если пользователь не найден, он будет создан
      },
    );
    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('Переданы некорректные данные при обновлении аватара.'));
      return;
    }
    if (err.name === 'ValidationError') {
      next(new BadRequest('Переданы некорректные данные при обновлении аватара.'));
      return;
    }
    next(new InternalServerError('Ошибка по умолчанию.'));
  }
};
