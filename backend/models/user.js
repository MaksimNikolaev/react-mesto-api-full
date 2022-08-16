const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: [2, 'минимальная длина имени — 2 символа'],
    maxlength: [30, 'максимальная длина имени — 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: false,
    minlength: [2, 'минимальная длина имени — 2 символа'],
    maxlength: [30, 'максимальная длина имени — 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    validate: [validator.isURL, 'Введите ссылку на изображение.'],
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Неправильный формат почты.'],
  },
  password: {
    type: String,
    required: true,
    select: false, /* хеш пароля пользователя не будет возвращаться из базы */
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
