const Card = require('../models/card');
const NotFoundError = require('../errors/Not-found-err');
const ForbiddenError = require('../errors/Forbidden-err');
const BadRequest = require('../errors/Bad-request-err');
const InternalServerError = require('../errors/Internal-server-err');

module.exports.getCards = async (req, res, next) => {
  try {
    const card = await Card.find({});
    res.send(card);
  } catch (err) {
    next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const card = await Card.create({ name, link, owner });
    res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest(`Переданы некорректные данные ${err}`));
      return;
    }
    next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

module.exports.deleteCardById = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      next(new NotFoundError('Карточка с указанным _id не найдена.'));
      return;
    }
    if (String(card.owner) === String(req.user._id)) {
      await card.remove();
      res.send(card);
      return;
    }
    next(new ForbiddenError('Нельзя удалить карточку, созданную другим пользователем'));
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest(`Переданы некорректные данные ${err}`));
      return;
    }
    next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (!card) {
      next(new NotFoundError('Передан несуществующий _id карточки.'));
      return;
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('Переданы некорректные данные для постановки/снятии лайка.'));
      return;
    }
    next(new InternalServerError('Ошибка по умолчанию.'));
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    );
    if (!card) {
      next(new NotFoundError('Передан несуществующий _id карточки.'));
      return;
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('Переданы некорректные данные для постановки/снятии лайка.'));
      return;
    }
    next(new InternalServerError('Ошибка по умолчанию.'));
  }
};
