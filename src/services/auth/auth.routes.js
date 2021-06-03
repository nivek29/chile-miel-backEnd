const { Router } = require('express');

const AuthController = require('./auth.controller');
const AuthValidation = require('./auth.validation');

const router = Router();

router.route('/').post(AuthValidation.create, AuthController.create);

router.route('/login').post(AuthValidation.login, AuthController.login);

module.exports = router;
