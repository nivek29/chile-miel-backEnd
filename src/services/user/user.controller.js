const jwt = require('jsonwebtoken');
const rut = require('rut.js');

const config = require('../../config/config');
const User = require('./user.model');
const { asyncHandler } = require('../../middlewares/async');
const HttpError = require('../../errors/http');
const { buildParams } = require('../../utils/controller');

class UserControllerClass {
  _validParams = [
    'name',
    'lastName',
    'email',
    'rut',
    'isActive',
    'password',
  ];

  find = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    if (!user) return next(new HttpError('UserDoesNotExists', 422));

    req.user = user;

    return next();
  });

  me = asyncHandler(async (req, res, next) => {
    return res.json({ data: req.user });
  });

  update = asyncHandler(async (req, res, next) => {
    const removeFields = ['isActive', 'fradaId', 'fradaRef', '_id'];

    removeFields.forEach((field) => delete req.body[field]);

    Object.assign(req.user, req.body);

    await req.user.save();

    return res.status(201).json({ data: req.user });
  });
}

const UserController = new UserControllerClass();

module.exports = UserController;
