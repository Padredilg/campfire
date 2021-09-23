const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
    res.render('homepage', {
        // posts,
        // loggedIn: req.session.loggedIn
    })
})

module.exports = router;