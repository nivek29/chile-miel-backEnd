const Utils = require('../../utils');
const HttpError = require('../../errors/http');

class AuthValidationClass {
  create = (req, res, next) => {
    const requiredParams = [
      'name',
      'lastName',
      'email',
      'fradaId',
      'fradaRef',
      'phone',
      'company',
      'description',
      'activity',
      'region',
      'rut',
    ];
    const { body } = req;

    const errors = [];

    requiredParams.forEach((param) => {
      if (!body[param]) {
        errors.push(new HttpError('FieldIsRequired', 422, { field: param }));
      }
    });

    if (body.email && !Utils.isEmail(body.email)) {
      errors.push(new HttpError('FieldIsNotValid', 422, { field: 'email' }));
    }

    if (body.description && body.description.length > 5000) {
      errors.push(new HttpError('FielsIsTooLong', 422, { field: 'description' }));
    }

    if (errors.length) next(errors);
    else next();
  };

  login = (req, res, next) => {
    const requiredParams = ['email', 'password'];
    const { body } = req;

    const errors = [];

    requiredParams.forEach((param) => {
      if (!body[param]) {
        errors.push(new HttpError('FieldIsRequired', 422, { field: param }));
      }
    });

    if (body.email && !Utils.isEmail(body.email)) {
      errors.push(new HttpError('FieldIsNotValid', 422, { field: 'email' }));
    }

    if (body.password && body.password.length < 6) {
      errors.push(new HttpError('FieldIsTooShort', 422, { field: 'password', limit: '6' }));
    }

    if (body.password && body.password.length > 20) {
      errors.push(new HttpError('FieldIsTooLong', 422, { field: 'password', limit: '20' }));
    }

    if (errors.length) next(errors);
    else next();
  };
}

const AuthValidation = new AuthValidationClass();

module.exports = AuthValidation;
