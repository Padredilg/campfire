const router = require('express').Router();

const homeRoutes = require('./home-routes');
const profileRoutes = require('./profile-routes.js');

router.use('/profile', profileRoutes);
router.use('/', homeRoutes);

module.exports = router;