const { Router } = require('express');

const ProfileController = require('./profile.controller');


const router = Router();

router.route('/').get(ProfileController.profileList);

module.exports = router;
