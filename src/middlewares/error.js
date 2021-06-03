const { MongoError } = require('mongodb');
const { TokenExpiredError, JsonWebTokenError } = require('jsonwebtoken');

const HttpError = require('../errors/http');
const InternalServerError = require('../errors/internalServer');
const Utils = require('../utils');

const error = (err, req, res, next) => {
  let errors;

  if (process.env.NODE_ENV !== 'test') {
    console.error('REQUESTED_ENDPOINT', req.originalUrl, '\n', 'ERROR_HANDLED', err);
  }

  if (err instanceof Array) {
    errors = err;
  } else if (err instanceof HttpError) {
    errors = [err];
  } else if (err instanceof MongoError) {
    if (err.code === 11000) {
      const field = Utils.capitalizeEach(
        err.message.split('index:')[1].split('dup key')[0].split('_')[0],
      );
      errors = [new HttpError('DuplicatedField', 422, { field })];
    } else {
      errors = [new InternalServerError()];
    }
  } else if (err instanceof TokenExpiredError) {
    errors = [new HttpError('TokenExpired', 422)];
  } else if (err instanceof JsonWebTokenError) {
    errors = [new HttpError('InvalidToken', 422)];
  } else {
    console.error('Error without handler', err);
    errors = [new InternalServerError()];
  }

  const error = errors[0];

  res.status(error.status).json({
    error: {
      errors,
      code: error.status,
      messages: error.message,
    },
  });
};

module.exports = error;
