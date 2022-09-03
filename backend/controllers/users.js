const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id).orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'DocumentNotFoundError') {
        const err = new Error('Пользователь не найден');
        err.statusCode = 404;
        next(err);
      } else {
        next(error);
      }
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id).orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'DocumentNotFoundError') {
        const err = new Error('Информация о пользователе не найдена');
        err.statusCode = 404;
        next(err);
      } else {
        next(error);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        const err = new Error('Некорректные данные при создании пользователя');
        err.statusCode = 400;
        next(err);
      }
      if (error.code === 11000) {
        const err = new Error('Пользователь с таким email уже существует');
        err.statusCode = 409;
        next(err);
      } else {
        next(error);
      }
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        const err = new Error('Некорректные данные при обновлении пользователя');
        err.statusCode = 400;
        next(err);
      } else {
        next(error);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        const err = new Error('Некорректные данные при обновлении аватара');
        err.statusCode = 400;
        next(err);
      } else {
        next(error);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', {
        expiresIn: '7d',
      });
      res.send({ jwt: token });
    })
    .catch(next);
};
