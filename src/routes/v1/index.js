const { Router } = require('express');
const UserRoutes = require('../../services/user/user.routes');
const AuthRoutes = require('../../services/auth/auth.routes');
const ProfileRoutes = require('../../services/profile/profile.routes');

const router = Router();

router.use('/user', UserRoutes);

router.use('/auth', AuthRoutes);

router.use('/profile',ProfileRoutes)

module.exports = router;
