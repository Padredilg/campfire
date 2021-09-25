const router = require('express').Router();
const { Channel } = require('../../models');

router.get('/', (req, res) => {

});

router.get('/:name',  (req, res) => {
    
});

router.post('/',  (req, res) => {
    Channel.create({
        name: req.body.name,
        userId: req.user.id
    })
})

module.exports = router;