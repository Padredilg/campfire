const router = require('express').Router();

const userRoutes = require('./user-routes');
const channels = require('./channels');

router.use('/users', userRoutes);
router.use('/channel', channels);

module.exports = router;