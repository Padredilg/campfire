const router = require('express').Router();
const { Channel } = require('../../models');

router.get('/', (req, res) => {
    Channel.findAll({
        attributes: [
            'id',
            'name'
        ],
        order: [['name', 'ASC']]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:name',  (req, res) => {
    
});

router.post('/',  (req, res) => {
    Channel.create({
        name: req.body.name,
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;