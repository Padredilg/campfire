const router = require('express').Router();

const homeRoutes = require('./home-routes');
const profileRoutes = require('./profile-routes.js');


router.use('/', homeRoutes);
router.use('/profile', profileRoutes);

module.exports = router;