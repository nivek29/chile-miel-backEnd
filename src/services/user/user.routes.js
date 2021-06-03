const { Router } = require('express');

const UserController = require('./user.controller');

const router = Router();

router.route('/:userId').get(UserController.me).put(UserController.update);

router.param('userId', UserController.find);

module.exports = router;
